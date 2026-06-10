export default function PersonalInfo() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">

      <div>
        <label className="mb-2 block font-medium">
          First Name
        </label>

        <input
          type="text"
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Juan"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Last Name
        </label>

        <input
          type="text"
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Dela Cruz"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="juan@email.com"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Phone
        </label>

        <input
          type="text"
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="+63 9123456789"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block font-medium">
          Address
        </label>

        <input
          type="text"
          className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          placeholder="Cebu City, Philippines"
        />
      </div>

    </div>
  );
}