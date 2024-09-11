import { DialogTrigger } from '@radix-ui/react-dialog'
import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { PendingGoals } from './pending-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../api/get-summary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 segundos
  })

  if (!data) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D [de] MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D [de] MMM')

  const completedPercentage = Math.round(
    (data?.completedAmount * 100) / data?.totalAmount
  )

  return (
    <div className="py-10 max-w-lg px-5 mx-auto flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <h2 className="text-lg font-semibold">
            {firstDayOfWeek} a {lastDayOfWeek}
          </h2>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus size={16} /> Cadastrar meta
          </Button>
        </DialogTrigger>
      </header>
      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>
          Você completou <strong>{data?.completedAmount}</strong> de{' '}
          <strong>{data?.totalAmount}</strong> metas nessa semana.
        </span>
        <span>{completedPercentage}%</span>
      </div>
      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const formattedDate = dayjs(date).format('D [de] MMMM')

          return (
            <section className="flex flex-col gap-4" key={date}>
              <h3 className="font-medium">
                <span className="capitalize">{weekDay}</span>{' '}
                <span className="text-zinc-400 text-xs">{formattedDate}</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map(goal => {
                  const formattedTime = dayjs(goal.completedAt).format('HH:mm')

                  return (
                    <li
                      className="flex items-center gap-2 text-sm text-zinc-400"
                      key={goal.id}
                    >
                      <CheckCircle2 size={16} className="text-pink-500" />
                      <span>
                        Você completou "<strong>{goal.title}</strong>" às{' '}
                        <strong>{formattedTime}h</strong>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
