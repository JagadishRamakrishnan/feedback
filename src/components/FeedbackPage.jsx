import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FeedbackCard from "./FeedbackCard";
import { getAssignments } from "../services/assignmentApi";

const BackgroundCard = ({ className, index = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{
        delay: (index % 5) * 0.1,
        duration: 0.8,
      }}
      className={`bg-white h-50 rounded-xl shadow-sm border border-gray-200/60 p-4 ${className} flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3 w-full">
          <div className="w-full h-full rounded-lg">
            <img
              src="https://aedindia.com/assets/images/new-logo1.png"
              alt=""
              className="w-fit h-15 object-contain m-auto rounded-lg block"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FloatingColumn = ({ speed = 20, children, className }) => (
  <motion.div
    animate={{ y: [0, "-50%"] }}
    transition={{
      duration: speed,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    }}
    style={{ willChange: "transform" }}
    className={className}
  >
    {children}
    {children}
  </motion.div>
);

const FeedbackPage = () => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchAssignment = async () => {
    try {
      setLoading(true);

      const response = await getAssignments();

      console.log("Assignments response:", response);

      const assignments = response?.assignments || [];

      if (assignments.length === 0) {
        setAssignment(null);
        return;
      }

      // Get the newest assignment based on createdAt
      const newestAssignment = [...assignments].sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      )[0];

      setAssignment(newestAssignment);
    } catch (error) {
      console.error(
        "Failed to fetch assignment:",
        error
      );

      setAssignment(null);
    } finally {
      setLoading(false);
    }
  };

  fetchAssignment();
}, []);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 flex gap-6 justify-center opacity-40 select-none pointer-events-none -skew-y-6 scale-110 overflow-hidden">
        <FloatingColumn speed={40} className="flex flex-col gap-6 w-64">
          {[1, 2, 3, 4, 5].map((i) => (
            <BackgroundCard
              key={i}
              index={i}
              className="h-40"
            />
          ))}
        </FloatingColumn>

        <FloatingColumn
          speed={55}
          className="flex flex-col gap-6 w-64 pt-20"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <BackgroundCard
              key={i}
              index={i + 10}
              className="h-40"
            />
          ))}
        </FloatingColumn>

        <FloatingColumn speed={45} className="flex flex-col gap-6 w-64">
          {[1, 2, 3, 4, 5].map((i) => (
            <BackgroundCard
              key={i}
              index={i + 20}
              className="h-40"
            />
          ))}
        </FloatingColumn>

        <FloatingColumn
          speed={60}
          className="flex flex-col gap-6 w-64 pt-32 hidden md:flex"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <BackgroundCard
              key={i}
              index={i + 30}
              className="h-40"
            />
          ))}
        </FloatingColumn>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none" />

      {/* Feedback Card */}
      {loading ? (
        <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-500">Loading feedback...</p>
        </div>
      ) : !assignment ? (
        <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No Feedback Assigned
          </h2>

          <p className="text-gray-500 mt-2">
            You currently don't have any feedback assigned to you.
          </p>
        </div>
      ) : (
        <FeedbackCard assignment={assignment} />
      )}
    </div>
  );
};

export default FeedbackPage;