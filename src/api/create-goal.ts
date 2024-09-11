interface CreateGoalRequest {
  title: string
  frequency: number
}

export async function createGoal({ title, frequency }: CreateGoalRequest) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, frequency }),
  })
}
