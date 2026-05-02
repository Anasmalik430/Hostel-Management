import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      // For development: If no user exists at all, create this one as the first admin
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        const newUser = await User.create({ email, password });
        return new Response(JSON.stringify({ 
          success: true, 
          user: { id: newUser._id, email: newUser.email },
          token: "session_" + Date.now() // Simple session token
        }), { status: 200 });
      }
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
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
