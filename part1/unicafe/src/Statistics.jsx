import StaisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {
  const average = () => (good - bad) / (good + bad + neutral)
  const positive = () => good / (good + bad + neutral)
  if (good + bad + neutral === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StaisticLine text='good' value={good} />
          <StaisticLine text='neutral' value={neutral} />
          <StaisticLine text='bad' value={bad} />
          <StaisticLine text='average' value={average()} />
          <StaisticLine text='positive' value={positive()} />
        </tbody>
      </table>
    </div>
  )
}

export default Statistics