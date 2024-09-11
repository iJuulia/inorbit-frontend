import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../api/get-pending-goals'
import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { createCompletedGoal } from '../api/create-completed-goal'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pendingGoals'],
    queryFn: getPendingGoals,
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createCompletedGoal(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pendingGoals'] })
  }

  return (
    <div className='flex flex-wrap gap-3'>
      {data.map(goal => {
        return (
          <OutlineButton
            onClick={() => handleCompleteGoal(goal.id)}
            key={goal.id}
            disabled={goal.completedCount >= goal.frequency}
          >
            <Plus size={16} className='text-zinc-600' />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
