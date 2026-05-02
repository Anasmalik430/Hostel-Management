import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      // If this specific user doesn't exist, create them
      // This is helpful if the user wants to use a specific email as the master admin
      const newUser = await User.create({ email, password });
      return new Response(JSON.stringify({ 
        success: true, 
        user: { id: newUser._id, email: newUser.email },
        token: "session_" + Date.now() 
      }), { status: 200 });
    }

    if (user.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      user: { id: user._id, email: user.email },
      token: "session_" + Date.now() 
    }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
