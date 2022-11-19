import { format } from "date-fns"
import ptBR from "date-fns/esm/locale/pt-BR"

export function formatCreationDate(createdAt: string) {
  const createdAtDate = new Date(createdAt)

  const creationDateFormatted = format(createdAtDate, "d 'de' LLL 'de' yyyy 'às' HH:mm'h'", {
    locale: ptBR
  })

  return creationDateFormatted
}
