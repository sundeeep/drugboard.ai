import { getUserByUsername } from "@/lib/users/getUserByUsername";
import { redirect } from "next/navigation";

export const generateMetadata = async (
    { params, searchParams }
  ) => {

    const user = await getUserByUsername(params?.username);

    if(!user){
      return redirect("/onboarding");
    }

    // console.log(user);

    const username=user.username;
    const displayName=user.displayName;

    return {
      title: `${username} 🌟 drugboard.ai`,
      description: `The CV, Resume and Research work of Mr.${displayName}`
    }
  }
  
  export default function UserProfileLayout({ children }) {
    return (
      <div className="bg-devGarrageBGImage bg-cover bg-center bg-fixed h-screen w-full overflow-auto">
          {children}
      </div>
    );
  }
  