import Form from "@/components/Form";
import { Navbar } from "@/components/Navbar";
import { FC } from "react";
import { fields } from "@/data/registerationFields";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { API } from "@/utils/api";
import { toast } from "sonner";

export const RegisterShop: FC = () => {
  const { user } = useUser();

  const handleRegister = async (
    data: Record<string, any>,
    resetForm: () => void
  ) => {
    const ownerId = user?.id;

    const formData = new FormData();

    if (ownerId) {
      formData.append("ownerId", ownerId);
    }

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.picture) {
      formData.append("picture", data.picture[0]);
    }

    try {
      const response = await axios.post(`${API}/api/v1/shop`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Shop registered successfully!");
      resetForm();
    } catch (error: any) {
      console.error("Error registering shop:", error);
      toast.error("Failed to register shop. Please try again.");
    }
  };

  return (
    <>
      <div className="px-6 md:px-[200px]">
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Register Your Shop
            </h2>
            <Form
              fields={fields}
              onSubmit={handleRegister}
              submitButtonText="Register Shop"
            />
          </div>
        </div>
      </div>
    </>
  );
};
