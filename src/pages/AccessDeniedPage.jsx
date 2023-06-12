import React from "react";

function AccessDeniedPage() {
  return (
    <div className="flex flex-col pb-16 md:pb-0 md:pl-20 w-full text-white pt-6 gap-4">
      <h1 className="text-5xl font-medium ml-6">Access Denied</h1>
      <h2 className="text-xl ml-6">You do not have Access to "/editProfile"</h2>
    </div>
  );
}

export default AccessDeniedPage;
