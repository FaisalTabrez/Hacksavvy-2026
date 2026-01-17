'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Trash2, Plus, Upload, Loader2, Copy, Check } from 'lucide-react'
import Image from 'next/image'
import { registerTeam } from '@/app/register/actions'

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

const memberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number required"),
  college: z.string().min(2, "College name required"),
  rollNo: z.string().optional(),
  dietPreference: z.enum(['Vegetarian', 'Non-Vegetarian']),
})

const registrationSchema = z.object({
  // Section A
  teamName: z.string().min(3, "Team Name must be at least 3 chars"),
  track: z.enum([
    "AI, Automation, Robotics & Drone Technology",
    "Cyber Security & Blockchain",
    "IoT, VLSI & Embedded Systems",
    "Sustainability & Environment",
    "Open Innovation"
  ]),

  // Section B
  leader: z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email(), // ReadOnly, but validated
    phone: z.string().min(10, "Phone required"),
    college: z.string().min(2, "College required"),
    rollNo: z.string().min(1, "Roll No required"),
    dietPreference: z.enum(['Vegetarian', 'Non-Vegetarian']),
  }),
  members: z.array(memberSchema).max(4), // Max 4 extra members (Total 5)

  // Section C
  transactionId: z.string().min(4, "Transaction ID required"),
  accommodation: z.boolean().default(false),
})

export type RegistrationFormValues = z.infer<typeof registrationSchema>

export default function RegistrationForm({ user, initialData }: { user: any, initialData?: any }) {
  const router = useRouter()
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Parse initialData if present to match form shape
  const defaultValues: Partial<RegistrationFormValues> = initialData ? {
    teamName: initialData.team_name,
    track: initialData.track,
    transactionId: initialData.transaction_id,
    accommodation: initialData.accommodation_needed,
    leader: {
        ...initialData.members_data[0],
        rollNo: initialData.members_data[0].roll_no 
    },
    members: initialData.members_data.slice(1).map((m: any) => ({
        ...m,
        rollNo: m.roll_no 
    }))
  } : {
      teamName: '',
      track: 'Open Innovation',
      leader: {
        name: user?.user_metadata?.full_name || user?.user_metadata?.name || '',
        email: user?.email || '',
        phone: '',
        college: '',
        rollNo: '',
        dietPreference: 'Vegetarian',
      },
      members: [], // Start with 0 extra members
      transactionId: '',
      accommodation: false,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema) as any,
    defaultValues: defaultValues as any,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  })

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmissionError(null)
    
    // Team Size Validation (Leader + Members)
    const totalSize = 1 + data.members.length
    if (totalSize < 2 || totalSize > 5) {
      setSubmissionError("Team size must be between 2 and 5 members.")
      return
    }

    if (!screenshot) {
      setSubmissionError("Payment proof (Screenshot or PDF) is required.")
      return
    }
    
    // Manual file type check for client-side
    if (!ACCEPTED_FILE_TYPES.includes(screenshot.type)) {
       setSubmissionError("Invalid file type. Please upload an Image or PDF.")
       return
    }

    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    formData.append("screenshot", screenshot)

    try {
      const result = await registerTeam(formData)
      ifrouter.refresh()
        window.location.href = '/register/success'
      } else {
        setSubmissionError(result.error || "Registration failed")
      }
    } catch (err: any) {
      setSubmissionError(err.message || "Something went wrong")
    }
  }

  const inputClasses = "w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 rounded-lg p-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
  const labelClasses = "block text-sm font-medium text-gray-300 uppercase tracking-wide mb-2"
  const sectionHeaderClasses = "text-xl font-bold font-grotesk text-white border-l-4 border-red-600 pl-4 mb-6"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      
      {/* SECTION A: Team Info */}
      <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className={sectionHeaderClasses}>Team Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClasses}>Team Name</label>
            <input 
              {...register("teamName")} 
              className={inputClasses} 
              placeholder="e.g. Byte Busters"
            />
            {errors.teamName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.teamName.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className={labelClasses}>Track / Theme</label>
            <select 
              {...register("track")}
              className={`${inputClasses} bg-neutral-900`} // Ensure contrast for options
            >
              <option value="AI, Automation, Robotics & Drone Technology">AI, Automation, Robotics & Drone Technology</option>
              <option value="Cyber Security & Blockchain">Cyber Security & Blockchain</option>
              <option value="IoT, VLSI & Embedded Systems">IoT, VLSI & Embedded Systems</option>
              <option value="Sustainability & Environment">Sustainability & Environment</option>
              <option value="Open Innovation">Open Innovation</option>
            </select>
            {errors.track && <p className="text-red-500 text-xs mt-1 font-medium">{errors.track.message}</p>}
          </div>
        </div>
      </div>

      {/* SECTION B: Members */}
      <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl space-y-8">
        <h2 className={sectionHeaderClasses}>Team Members</h2>
        
        {/* LEADER */}
        <div className="p-6 bg-red-950/10 rounded-xl border border-red-500/20 relative">
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            TEAM LEADER
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
             <div className="md:col-span-1">
               <label className={labelClasses}>Full Name</label>
               <input {...register("leader.name")} className={inputClasses} />
               {errors.leader?.name && <p className="text-red-500 text-xs mt-1">{errors.leader.name.message}</p>}
             </div>
             <div className="md:col-span-1">
               <label className={labelClasses}>Email (Read Only)</label>
               <input {...register("leader.email")} readOnly className={`${inputClasses} opacity-50 cursor-not-allowed`} />
             </div>
             <div className="md:col-span-1">
               <label className={labelClasses}>Mobile Number</label>
               <input {...register("leader.phone")} className={inputClasses} placeholder="+91" />
               {errors.leader?.phone && <p className="text-red-500 text-xs mt-1">{errors.leader.phone.message}</p>}
             </div>
             <div className="md:col-span-1">
               <label className={labelClasses}>College Name</label>
               <input {...register("leader.college")} className={inputClasses} />
               {errors.leader?.college && <p className="text-red-500 text-xs mt-1">{errors.leader.college.message}</p>}
             </div>
             <div className="md:col-span-1">
               <label className={labelClasses}>Roll Number</label>
               <input {...register("leader.rollNo")} className={inputClasses} />
               {errors.leader?.rollNo && <p className="text-red-500 text-xs mt-1">{errors.leader.rollNo.message}</p>}
             </div>
             <div className="md:col-span-1">
                <label className={labelClasses}>Food Preference</label>
                <select {...register("leader.dietPreference")} className={`${inputClasses} bg-neutral-900`}>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
             </div>
          </div>
        </div>

        {/* Dynamic Members */}
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 bg-white/5 rounded-xl border border-white/10 relative animate-in fade-in slide-in-from-bottom-4">
            <button 
              type="button" 
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 pb-2 border-b border-white/5">
              Member #{index + 1}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                 <label className={labelClasses}>Name</label>
                 <input {...register(`members.${index}.name`)} className={inputClasses} />
                 {errors.members?.[index]?.name && <p className="text-red-500 text-xs mt-1">{errors.members[index]?.name?.message}</p>}
              </div>
              <div className="md:col-span-1">
                 <label className={labelClasses}>Email</label>
                 <input {...register(`members.${index}.email`)} type="email" className={inputClasses} />
                 {errors.members?.[index]?.email && <p className="text-red-500 text-xs mt-1">{errors.members[index]?.email?.message}</p>}
              </div>
              <div className="md:col-span-1">
                 <label className={labelClasses}>Phone</label>
                 <input {...register(`members.${index}.phone`)} className={inputClasses} />
                 {errors.members?.[index]?.phone && <p className="text-red-500 text-xs mt-1">{errors.members[index]?.phone?.message}</p>}
              </div>
              <div className="md:col-span-1">
                 <label className={labelClasses}>College</label>
                 <input {...register(`members.${index}.college`)} className={inputClasses} />
                 {errors.members?.[index]?.college && <p className="text-red-500 text-xs mt-1">{errors.members[index]?.college?.message}</p>}
              </div>
              <div className="md:col-span-1">
                 <label className={labelClasses}>Roll No</label>
                 <input {...register(`members.${index}.rollNo`)} className={inputClasses} />
                 {errors.members?.[index]?.rollNo && <p className="text-red-500 text-xs mt-1">{errors.members[index]?.rollNo?.message}</p>}
              </div>
              <div className="md:col-span-1">
                 <label className={labelClasses}>Food Preference</label>
                 <select {...register(`members.${index}.dietPreference`)} className={`${inputClasses} bg-neutral-900`}>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                 </select>
              </div>
            </div>
          </div>
        ))}

        {fields.length < 4 && (
          <button
            type="button"
            onClick={() => append({ name: '', email: '', phone: '', college: '', rollNo: '', dietPreference: 'Vegetarian' })}
            className="w-full py-4 border border-dashed border-red-500/30 text-red-400 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/10 hover:border-red-500 transition-all group font-medium"
          >
            <div className="p-1 rounded-full bg-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            Add Team Member ({fields.length}/4)
          </button>
        )}
        <p className="text-xs text-gray-500 text-center font-mono">
           * Minimum 2 members (Leader + 1) required. Maximum 5 total.
        </p>
      </div>

      {/* SECTION C: Payment */}
      <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
        <h2 className={sectionHeaderClasses}>Payment & Logistics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* QR Code Column */}
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/10">
             <div className="relative w-48 h-48 mb-4">
                 <Image 
                    src="/assets/qrcode.png" 
                    alt="Payment QR" 
                    fill
                    className="object-contain rounded-lg border-2 border-white/20"
                 />
             </div>
             <p className="text-xs text-center text-gray-400 max-w-[200px]">
               Scan this QR code with any UPI app to pay the registration fee of <span className="text-white font-bold">₹2,500</span>.
             </p>
          </div>

          {/* Bank Details Column */}
          <div className="space-y-6">
             <div className="bg-neutral-900/80 p-6 rounded-xl border border-white/10 space-y-3">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
                  Bank Transfer Details
                </h3>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-gray-500">Account Name:</div>
                  <div className="col-span-2 text-white font-medium">MGIT TECH FEST Account</div>
                  
                  <div className="text-gray-500 self-center">Account No:</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <code className="bg-black/40 px-2 py-1 rounded text-red-200 font-mono">438501000067</code>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard('438501000067', 'acc')}
                      className="p-1 hover:bg-white/10 rounded transition"
                    >
                      {copiedField === 'acc' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                    </button>
                  </div>

                  <div className="text-gray-500 self-center">IFSC Code:</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <code className="bg-black/40 px-2 py-1 rounded text-red-200 font-mono">ICIC0004385</code>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard('ICIC0004385', 'ifsc')}
                      className="p-1 hover:bg-white/10 rounded transition"
                    >
                      {copiedField === 'ifsc' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                    </button>
                  </div>

                  <div className="text-gray-500">Bank:</div>
                  <div className="col-span-2 text-white">ICICI Bank</div>
                  
                  <div className="text-gray-500">Branch:</div>
                  <div className="col-span-2 text-white">CBIT Gandipet, Hyderabad</div>
                </div>
             </div>

             <div>
              <label className={labelClasses}>Transaction ID (UTR)</label>
              <input 
                {...register("transactionId")}
                className={`${inputClasses} font-mono tracking-wider`}
                placeholder="UTR1234567890"
              />
              {errors.transactionId && <p className="text-red-500 text-xs mt-1 font-medium">{errors.transactionId.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-white/5 pt-6">
            <div>
              <label className={labelClasses}>Payment Proof (Screenshot / PDF)</label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setScreenshot(file)
                    }
                  }}
                  className="hidden" 
                  id="screenshot-upload"
                />
                <label 
                  htmlFor="screenshot-upload"
                  className={`w-full flex flex-col items-center justify-center gap-3 bg-white/5 border-2 border-dashed ${screenshot ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 group-hover:border-red-500/50 group-hover:bg-red-500/5'} rounded-xl p-8 cursor-pointer transition-all duration-300`}
                >
                  <Upload className={`w-8 h-8 ${screenshot ? 'text-green-400' : 'text-gray-400 group-hover:text-red-400'}`} />
                  <span className={`text-sm font-medium ${screenshot ? 'text-green-300' : 'text-gray-400 group-hover:text-red-300'} break-all text-center`}>
                    {screenshot ? screenshot.name : "Click to Upload Payment Proof"}
                  </span>
                  {!screenshot && <span className="text-xs text-gray-600">Max size: 5MB (JPG, PNG, PDF)</span>}
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition">
                <input 
                  type="checkbox"
                  id="accommodation"
                  {...register("accommodation")}
                  className="w-5 h-5 rounded border-gray-600 bg-black/50 text-red-600 focus:ring-red-600 focus:ring-offset-black"
                />
                <label htmlFor="accommodation" className="cursor-pointer text-sm text-gray-300 select-none">
                    Do you require accommodation at MGIT? <span className="text-gray-500 ml-1 text-xs">(Subject to availability)</span>
                </label>
            </div>
        </div>
      </div>

      {submissionError && (
        <div className="p-4 bg-red-950/30 border border-red-500/30 text-red-400 rounded-xl text-sm text-center font-medium animate-in fade-in zoom-in-95">
            {submissionError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-red-600 text-white font-bold text-lg uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
      >
        {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
        {isSubmitting ? 'Processing Registration...' : 'Complete Registration'}
      </button>

    </form>
  )
}
