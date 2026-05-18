type Props = {
  status: string
}

export default function OrderTimeline({
  status
}: Props) {

  const steps = [
    "Pending",
    "Shipped",
    "Delivered"
  ]

  function isCompleted(
    step: string
  ) {

    return (
      steps.indexOf(step) <=
      steps.indexOf(status)
    )

  }

  return (

    <div className="flex items-center gap-4 mt-4">

      {steps.map(
        (step, i) => (

          <div
            key={i}
            className="flex items-center gap-2"
          >

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm
              ${
                isCompleted(step)
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            >

              ✓

            </div>

            <span
              className={`text-sm ${
                isCompleted(step)
                  ? "text-green-600 font-semibold"
                  : "text-gray-400"
              }`}
            >

              {step}

            </span>

            {i <
              steps.length - 1 && (

              <div
                className={`w-10 h-1
                ${
                  isCompleted(
                    steps[i + 1]
                  )
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              />

            )}

          </div>

        )
      )}

    </div>

  )

}