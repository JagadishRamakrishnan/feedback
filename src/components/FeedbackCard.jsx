import { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiHash,
  FiMessageSquare,
  FiCalendar,
  FiClipboard,
} from "react-icons/fi";
import { createFeedback } from "../services/feedbackApi";

function FeedbackCard({ assignment }) {
  const [form, setForm] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.feedback.length < 250) {
      alert("Feedback must contain at least 250 characters.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        assignedTitleId: assignment._id,
        employeeName: form.employeeName,
        employeeId: form.employeeId,
        designation: form.designation,
        feedback: form.feedback,
      };

      const response = await createFeedback(data);

      console.log("Feedback created:", response);

      alert("Feedback submitted successfully!");

      setForm({
        employeeName: "",
        employeeId: "",
        designation: "",
        feedback: "",
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to submit feedback"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/50 relative z-10">
      {/* Header */}
      <div className="text-center mb-7">
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-50">
          <img
            src="https://aedindia.com/assets/images/new-logo1.png"
            alt="Logo"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Employee Feedback
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Share your feedback and help us improve
        </p>
      </div>

      {/* Feedback Master Card */}
      <div className="mb-6 bg-white/70 border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <FiClipboard className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Feedback Details
            </h2>

            <p className="text-xs text-gray-500">
              Assigned feedback information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date
            </label>

            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={
                  assignment.date
                    ? new Date(assignment.date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : ""
                }
                readOnly
                className="input-field !pl-10 bg-gray-100/70 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Assigned Person */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Assigned To
            </label>

            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={assignment.assignedPerson || ""}
                readOnly
                className="input-field !pl-10 bg-gray-100/70 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Feedback Title
          </label>

          <div className="relative">
            <FiClipboard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={assignment.title || ""}
              readOnly
              className="input-field !pl-10 bg-gray-100/70 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Employee Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Employee Name
            </label>

            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="employeeName"
                value={form.employeeName}
                onChange={handleChange}
                className="input-field w-full !pl-10 bg-white/50 focus:bg-white transition-colors"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Employee ID
            </label>

            <div className="relative">
              <FiHash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                className="input-field w-full !pl-10 bg-white/50 focus:bg-white transition-colors"
                placeholder="Enter employee ID"
                required
              />
            </div>
          </div>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Designation
          </label>

          <div className="relative">
            <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <select
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className="input-field !pl-10 bg-white/50 focus:bg-white transition-colors"
              required
            >
              <option value="">Select Designation</option>
              <option value="junior-developer">
                Junior Developer
              </option>
              <option value="developer">Developer</option>
              <option value="tl-sd">
                Team Lead / Senior Developer
              </option>
              <option value="designer">Designer</option>
              <option value="s-designer">Senior Designer</option>
              <option value="manager">Manager</option>
              <option value="tester">Tester</option>
              <option value="intern">Intern</option>
            </select>
          </div>
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            How satisfied are you with your overall work experience?
          </label>

          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-5 text-gray-400" />

            <textarea
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
              rows="4"
              minLength={250}
              className="input-field !pl-10 !pt-3 bg-white/50 focus:bg-white transition-colors resize-none"
              placeholder="Share your feedback, suggestions or concerns..."
              required
            />

            <div className="text-xs text-gray-400 text-right mt-1">
              {form.feedback.length}/250 minimum characters
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-lg shadow-lg shadow-blue-200/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

export default FeedbackCard;