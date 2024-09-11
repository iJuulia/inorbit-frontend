import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from './ui/dialog'
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
} from './ui/radio-group'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { createGoal } from '../api/create-goal'
import { useQueryClient } from '@tanstack/react-query'

const createGoalSchema = z.object({
  title: z.string().min(1, 'Informe a atividade'),
  frequency: z.coerce.number().min(1).max(7),
})

type CreateGoalInputs = z.infer<typeof createGoalSchema>

export function CreateGoal() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalInputs>({
      resolver: zodResolver(createGoalSchema),
    })

  async function handleCreateGoal(data: CreateGoalInputs) {
    await createGoal({
      title: data.title,
      frequency: data.frequency,
    })
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pendingGoals'] })

    reset()
  }

  return (
    <DialogContent>
      <div className='flex flex-col gap-6 h-full'>
        <section className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose className='text-zinc-600'>
              <X size={20} />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </section>
        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className='flex flex-col justify-between flex-1'
        >
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Qual a atividade?</Label>
              <Input
                id='title'
                autoFocus
                placeholder='Praticar exercícios, meditar, etc...'
                {...register('title')}
              />

              {formState.errors.title && (
                <p className='text-red-400 text-sm'>
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Quantas vezes na semana?</Label>
              <Controller
                defaultValue={1}
                control={control}
                name='frequency'
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value='1'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>
                          1x na semana
                        </span>{' '}
                        <span className='text-lg leading-none'>🥱</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='2'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>
                          2x na semana
                        </span>{' '}
                        <span className='text-lg leading-none'>🙂</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='3'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>
                          3x na semana
                        </span>{' '}
                        <span className='text-lg leading-none'>😎</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='4'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>
                          4x na semana
                        </span>{' '}
                        <span className='text-lg leading-none'>😜</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='5'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>
                          5x na semana
                        </span>{' '}
                        <span className='text-lg leading-none'>🤨</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='6'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>
                          6x na semana
                        </span>{' '}
                        <span className='text-lg leading-none'>🤯</span>
                      </RadioGroupItem>
                      <RadioGroupItem value='7'>
                        <RadioGroupIndicator />
                        <span className='text-zinc-300 text-sm font-medium leading-none'>
                          Todos dias da semana
                        </span>{' '}
                        <span className='text-lg leading-none'>🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <DialogClose asChild>
              <Button type='button' className='flex-1' variant='secondary'>
                Fechar
              </Button>
            </DialogClose>
            <Button className='flex-1'>Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
