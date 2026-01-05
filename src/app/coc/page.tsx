import Link from 'next/link'

export default function CodeOfConductPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Code of Conduct
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Purpose</h2>
            <p>
              Hacksavvy 2026 is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of participants in any form.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Expected Behavior</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be respectful and considerate of others.</li>
              <li>Be collaborative and helpful.</li>
              <li>Respect the equipment and facilities.</li>
              <li>Follow the instructions of the event organizers and volunteers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Unacceptable Behavior</h2>
            <p className="mb-4">
              Harassment includes offensive verbal comments related to gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion, technology choices, sexual images in public spaces, deliberate intimidation, stalking, following, harassing photography or recording, sustained disruption of talks or other events, inappropriate physical contact, and unwelcome sexual attention.
            </p>
            <p>
              Participants asked to stop any harassing behavior are expected to comply immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Consequences</h2>
            <p>
              If a participant engages in harassing behavior, the event organizers may take any action they deem appropriate, including warning the offender or expulsion from the event with no refund (if applicable).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Reporting</h2>
            <p>
              If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of the event staff immediately. Event staff can be identified by their distinct t-shirts/badges.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
