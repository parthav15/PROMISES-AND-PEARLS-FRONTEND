import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon, InformationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const PredictionForm = ({ onSubmit, predictionResult, loading }) => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [stepDirection, setStepDirection] = useState(1);

  const fieldGroups = [
    ["age", "sex", "cp"],
    ["trestbps", "chol", "fbs"],
    ["restecg", "thalach", "exang"],
    ["oldpeak", "slope", "ca", "thal"],
  ];

  const fieldDetails = {
    age: {
      label: "Age",
      unit: "years",
      help: "Enter your age in years (29-77)",
    },
    sex: { 
      label: "Sex", 
      options: ["I don't know", "Female", "Male"], 
      help: "Biological sex" 
    },
    cp: {
      label: "Chest Pain Type",
      options: [
        "I don't know",
        "Typical Angina",
        "Atypical Angina",
        "Non-anginal Pain",
        "Asymptomatic",
      ],
      help: "Type of chest pain experienced",
    },
    trestbps: {
      label: "Resting BP",
      unit: "mm Hg",
      help: "Resting blood pressure (94-200)",
    },
    chol: {
      label: "Cholesterol",
      unit: "mg/dl",
      help: "Serum cholesterol (126-564)",
    },
    fbs: {
      label: "Fasting Blood Sugar",
      options: ["I don't know", "< 120 mg/dl", "> 120 mg/dl"],
      help: "Fasting blood sugar level",
    },
    restecg: {
      label: "Resting ECG",
      options: ["I don't know", "Normal", "ST-T Abnormality", "Left Ventricular Hypertrophy"],
      help: "Resting electrocardiographic results",
    },
    thalach: {
      label: "Max Heart Rate",
      unit: "bpm",
      help: "Maximum heart rate achieved (71-202)",
    },
    exang: {
      label: "Exercise Angina",
      options: ["I don't know", "No", "Yes"],
      help: "Exercise induced angina",
    },
    oldpeak: {
      label: "ST Depression",
      unit: "mm",
      help: "ST depression induced by exercise (0-6.2)",
    },
    slope: {
      label: "ST Slope",
      options: ["I don't know", "Upsloping", "Flat", "Downsloping"],
      help: "Slope of peak exercise ST segment",
    },
    ca: {
      label: "Major Vessels",
      help: "Number of major vessels (0-4) colored by flourosopy",
    },
    thal: {
      label: "Thalassemia",
      options: ["I don't know", "Normal", "Fixed Defect", "Reversible Defect"],
      help: "Thalassemia test result",
    },
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key, 
        value === "" ? 0 : Number(value)
      ])
    );

    if (currentStep === fieldGroups.length - 1) {
      onSubmit(processedData);
    }
  };

  const handleStepChange = (newStep) => {
    const direction = newStep > currentStep ? 1 : -1;
    setStepDirection(direction);
    setCurrentStep(newStep);
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ArrowPathIcon className="h-12 w-12 text-blue-400 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 mb-8">
        <HeartIcon className="h-8 w-8 text-red-500" />
        <h2 className="text-2xl font-bold text-white">
          Heart Health Assessment
        </h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-blue-400 hover:text-blue-300"
        >
          <InformationCircleIcon className="h-6 w-6" />
        </button>
      </div>

      {showHelp && (
        <motion.div
          className="bg-blue-900/30 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-gray-300 text-sm">
            Please provide accurate medical information for the best prediction
            results. All data is securely processed and never stored.
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait" custom={stepDirection}>
          <motion.div
            key={currentStep}
            custom={stepDirection}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {fieldGroups[currentStep].map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-gray-300 text-sm">
                  {fieldDetails[field].label}
                  {fieldDetails[field].unit && (
                    <span className="text-gray-400 ml-2">
                      ({fieldDetails[field].unit})
                    </span>
                  )}
                </label>

                {fieldDetails[field].options ? (
                  <select
                    name={field}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                  >
                    <option value="" style={{ backgroundColor: "#1A202C" }}>
                      Select {fieldDetails[field].label}
                    </option>
                    {fieldDetails[field].options.map((opt, idx) => (
                      <option
                        key={opt}
                        value={idx === 0 ? 0 : idx}
                        style={{ backgroundColor: "#1A202C" }}
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                    placeholder={`Enter ${fieldDetails[field].label}`}
                    step={field === "oldpeak" ? "0.1" : "1"}
                    min={field === "ca" ? 0 : undefined}
                    max={field === "ca" ? 4 : undefined}
                  />
                )}

                <p className="text-gray-400 text-xs">
                  {fieldDetails[field].help}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 0}
            className="px-6 py-2 border border-white/20 text-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {currentStep < fieldGroups.length - 1 ? (
            <button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <motion.button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Prediction
            </motion.button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {predictionResult && (
          <motion.div
            className={`mt-8 p-6 rounded-lg ${
              predictionResult.includes("not likely")
                ? "bg-green-900/30 border-green-400/20"
                : "bg-red-900/30 border-red-400/20"
            } border`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {predictionResult.includes("not likely")
                ? "✅ Low Risk Detected"
                : "⚠️ Potential Risk Detected"}
            </h3>
            <p className="text-gray-300">{predictionResult}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PredictionForm;