export async function downloadResumePdf() {
  window.print();
}

console.log("Supabase URL:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Service role key:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);