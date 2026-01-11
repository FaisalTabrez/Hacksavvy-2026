'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Trash2, Plus, Upload, Loader2 } from 'lucide-react'
import { registerTeam } from '@/app/register/actions'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
  track: z.enum(["AI", "CyberSec", "IoT", "Blockchain", "Robotics", "Open Innovation"]),
  // Removed Project Title and Abstract

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
  // File is handled separately in the form but we can validate its presence manually or via a refined schema if we controlled the input fully. 
  // We'll handle file "required" check in onSubmit.
})

export type RegistrationFormValues = z.infer<typeof registrationSchema>

export default function RegistrationForm({ user, initialData }: { user: any, initialData?: any }) {
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  // Parse initialData if present to match form shape
  const defaultValues: Partial<RegistrationFormValues> = initialData ? {
    teamName: initialData.team_name,
    track: initialData.track,
    transactionId: initialData.transaction_id,
    accommodation: initialData.accommodation_needed,
    leader: {
        ...initialData.members_data[0],
        rollNo: initialData.members_data[0].roll_no // Map snake_case to camelCase
    },
    members: initialData.members_data.slice(1).map((m: any) => ({
        ...m,
        rollNo: m.roll_no // Map snake_case
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

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmissionError(null)
    
    // Team Size Validation (Leader + Members)
    const totalSize = 1 + data.members.length
    if (totalSize < 2 || totalSize > 5) {
      setSubmissionError("Team size must be between 2 and 5 members.")
      return
    }

    if (!screenshot) {
      setSubmissionError("Payment screenshot is required.")
      return
    }

    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    formData.append("screenshot", screenshot)

    try {
      const result = await registerTeam(formData)
      if (result.success) {
        window.location.href = '/register/success'
      } else {
        setSubmissionError(result.error || "Registration failed")
      }
    } catch (err: any) {
      setSubmissionError(err.message || "Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-gray-200">
      
      {/* SECTION A: Team Info */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-bold text-[#00f0ff]">Team Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-400">Team Name</label>
            <input 
              {...register("teamName")} 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-[#00f0ff] outline-none" 
              placeholder="e.g. Byte Busters"
            />
            {errors.teamName && <p className="text-red-500 text-xs mt-1">{errors.teamName.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">Track</label>
            <select 
              {...register("track")}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-[#00f0ff] outline-none"
            >
              <option value="AI">AI & ML</option>
              <option value="CyberSec">Cybersecurity</option>
              <option value="IoT">IoT</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Robotics">Robotics</option>
              <option value="Open Innovation">Open Innovation</option>
            </select>
            {errors.track && <p className="text-red-500 text-xs mt-1">{errors.track.message}</p>}
          </div>
        </div>
      </div>

      {/* SECTION B: Members */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-[#00f0ff]">Team Members</h2>
        
        {/* LEADER */}
        <div className="p-4 bg-white/5 rounded-xl border border-dashed border-gray-600">
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Team Leader</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="text-xs text-gray-500">Full Name</label>
               <input {...register("leader.name")} className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-purple-500" />
               {errors.leader?.name && <p className="text-red-500 text-xs">{errors.leader.name.message}</p>}
             </div>
             <div>
               <label className="text-xs text-gray-500">Email (Read Only)</label>
               <input {...register("leader.email")} readOnly className="w-full bg-transparent border-b border-gray-700 p-2 text-gray-500" />
             </div>
             <div>
               <label className="text-xs text-gray-500">Mobile Number</label>
               <input {...register("leader.phone")} className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-purple-500" />
               {errors.leader?.phone && <p className="text-red-500 text-xs">{errors.leader.phone.message}</p>}
             </div>
             <div>
               <label className="text-xs text-gray-500">College Name</label>
               <input {...register("leader.college")} className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-purple-500" />
               {errors.leader?.college && <p className="text-red-500 text-xs">{errors.leader.college.message}</p>}
             </div>
             <div className="md:col-span-2">
               <label className="text-xs text-gray-500">Roll Number</label>
               <input {...register("leader.rollNo")} className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-purple-500" />
               {errors.leader?.rollNo && <p className="text-red-500 text-xs">{errors.leader.rollNo.message}</p>}
             </div>
             
             {/* Leader Diet (Allergies Removed) */}
             <div className="md:col-span-2">
                <label className="text-xs text-gray-500">Food Preference</label>
                <select {...register("leader.dietPreference")} className="w-full bg-black/30 border-b border-gray-700 p-2 outline-none focus:border-[#00f0ff]">
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
             </div>
          </div>
        </div>

        {/* Dynamic Members */}
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-white/5 rounded-xl border border-dashed border-gray-600 relative animate-in fade-in slide-in-from-bottom-4">
            <button 
              type="button" 
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Member #{index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                 <input {...register(`members.${index}.name`)} placeholder="Name" className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-blue-500" />
                 {errors.members?.[index]?.name && <p className="text-red-500 text-xs">{errors.members[index]?.name?.message}</p>}
              </div>
              <div>
                 <input {...register(`members.${index}.email`)} placeholder="Email" type="email" className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-blue-500" />
                 {errors.members?.[index]?.email && <p className="text-red-500 text-xs">{errors.members[index]?.email?.message}</p>}
              </div>
              <div>
                 <input {...register(`members.${index}.phone`)} placeholder="Phone" className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-blue-500" />
                 {errors.members?.[index]?.phone && <p className="text-red-500 text-xs">{errors.members[index]?.phone?.message}</p>}
              </div>
              <div>
                 <input {...register(`members.${index}.college`)} placeholder="College" className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-blue-500" />
                 {errors.members?.[index]?.college && <p className="text-red-500 text-xs">{errors.members[index]?.college?.message}</p>}
              </div>

              <div className="md:col-span-2">
                 <input {...register(`members.${index}.rollNo`)} placeholder="Roll Number" className="w-full bg-transparent border-b border-gray-700 p-2 outline-none focus:border-blue-500" />
                 {errors.members?.[index]?.rollNo && <p className="text-red-500 text-xs">{errors.members[index]?.rollNo?.message}</p>}
              </div>

               {/* Member Diet (Allergies Removed) */}
               <div className="md:col-span-2">
                 <label className="text-xs text-gray-500">Food Preference</label>
                 <select {...register(`members.${index}.dietPreference`)} className="w-full bg-black/30 border-b border-gray-700 p-2 outline-none focus:border-blue-500">
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
            className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition"
          >
            <Plus className="w-5 h-5" />
            Add Member ({fields.length}/4)
          </button>
        )}
        <p className="text-xs text-gray-500 text-center">
            Total Team Size: {1 + fields.length} (Min 2, Max 5)
        </p>
      </div>

      {/* SECTION C: Payment */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
        <h2 className="text-xl font-bold text-[#00f0ff]">Payment & Logistics</h2>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-40 h-40 bg-white p-2 rounded-lg shrink-0">
             {/* QR Code Placeholder */}
             <div className="w-full h-full bg-black/10 flex items-center justify-center text-black text-xs text-center border-2 border-dashed border-black">
                QR CODE
             </div>
          </div>
          <div className="space-y-4 flex-1 w-full">
            <p className="text-sm text-gray-400">Scan the QR code to pay the registration fee.</p>
            
            <div>
              <label className="block text-sm mb-1 text-gray-400">Transaction ID (UTR)</label>
              <input 
                {...register("transactionId")}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-[#00f0ff] outline-none font-mono"
                placeholder="UTR1234567890"
              />
              {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId.message}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-400">Payment Screenshot</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setScreenshot(e.target.files[0])
                    }
                  }}
                  className="hidden" 
                  id="screenshot-upload"
                />
                <label 
                  htmlFor="screenshot-upload"
                  className="w-full flex items-center gap-3 bg-black/50 border border-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/5 transition"
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400 truncate">
                    {screenshot ? screenshot.name : "Upload Screenshot"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
            <input 
              type="checkbox"
              id="accommodation"
              {...register("accommodation")}
              className="w-5 h-5 rounded border-gray-600 bg-black/50 text-[#00f0ff] focus:ring-[#00f0ff]"
            />
            <label htmlFor="accommodation" className="text-sm text-gray-300 select-none">
                Do you require accommodation at MGIT?
            </label>
        </div>
      </div>

      {submissionError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm text-center">
            {submissionError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#00f0ff] text-black font-bold uppercase tracking-wider rounded-xl hover:bg-[#00c0cc] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
        {isSubmitting ? 'Processing...' : 'Complete Registration'}
      </button>

    </form>
  )
}
