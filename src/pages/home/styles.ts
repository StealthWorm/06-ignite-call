import { styled, Heading, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  // 0 1160px é uma convenção para o tamanho  do container principal. Ou seja, a subtração é para pegar o que sobra.
  // a divisão por 2 é para adicionar o valor apenas na esquerda, e não em ambos os lados
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  // sem o sinal de ">" ele aplicaria o estilo em qualquer Text e Heading que encontrasse
  // com o sinal, indicamos que queremos aplicar somente no componente importado dentro do container que esta sendo estilizado, no caso, o "Hero"
  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    maskType: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
