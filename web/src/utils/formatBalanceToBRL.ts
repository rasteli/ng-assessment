export function formatBalanceToBRL(balanceInCents: number) {
  const balance = (balanceInCents! / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  return balance
}
