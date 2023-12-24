import { useUser } from "@clerk/clerk-react";
 
export default function UserInfoPage() {
  const { user } = useUser();
  if (!user) return null;
  const updateUser = async () => {
    await user.update({
      firstName: "John",
      lastName: "Doe",
    });
  };
  return (
    <>
      <button onClick={updateUser}>Click me to update your name</button>
      <p>user.firstName: {user?.firstName}</p>
      <p>user.lastName: {user?.lastName}</p>
      <p>user.id: {user?.id}</p>
    </>
  );
}