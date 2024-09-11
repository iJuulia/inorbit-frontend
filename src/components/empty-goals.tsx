import { DialogTrigger } from './ui/dialog'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src="logo.svg" alt="" />
      <img src="bg-illustration.svg" alt="" />
      <div className="flex items-center flex-col gap-5">
        <p className="max-w-prose text-zinc-300 leading-relaxed text-center">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
          mesmo?
        </p>
        <DialogTrigger asChild>
          <Button>
            <Plus size={16} /> Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
    </div>
  )
}
