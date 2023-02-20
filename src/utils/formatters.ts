export const capitalizedLabel = (label: string) => {
  const convertLabelText = label.toString()

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}

export const resolvePokemonTypes = (type: string) => {
  if (type === 'normal')
    return { color: '#8D6E63', icon: 'mdi-omega' }
  if (type === 'fire')
    return { color: '#EF5350', icon: 'mdi-fire' }
  if (type === 'water')
    return { color: '#5C6BC0', icon: 'mdi-waves' }
  if (type === 'grass')
    return { color: '#66BB6A', icon: 'mdi-grass' }
  if (type === 'electric')
    return { color: '#C79100', icon: 'mdi-lightning-bolt-circle' }
  if (type === 'ice')
    return { color: '#2196F3', icon: 'mdi-skate' }
  if (type === 'fighting')
    return { color: '#BA68C8', icon: 'mdi-dumbbell' }
  if (type === 'poison')
    return { color: '#FF7043', icon: 'mdi-deathly-hallows' }
  if (type === 'ground')
    return { color: '#00897B', icon: 'mdi-dots-hexagon' }
  if (type === 'flying')
    return { color: '#546E7A', icon: 'mdi-bee' }
  if (type === 'psychic')
    return { color: '#FFC107', icon: 'mdi-bullseye' }
  if (type === 'bug')
    return { color: '#CDDC39', icon: 'mdi-bug' }
  if (type === 'rock')
    return { color: '#9E9E9E', icon: 'mdi-mirror' }
  if (type === 'ghost')
    return { color: '#1B5E20', icon: 'mdi-ghost' }
  if (type === 'dark')
    return { color: '#009688', icon: 'mdi-brightness-6' }
  if (type === 'dragon')
    return { color: '#FFFF00', icon: 'mdi-jellyfish' }
  if (type === 'steel')
    return { color: '#607D8B', icon: 'mdi-anvil' }
  if (type === 'fairy')
    return { color: '#9575CD', icon: 'mdi-string-lights' }

  return { color: 'info', icon: 'mdi-record' }
}

export const convertBase = (value: number) => {
  return value / 10
}
