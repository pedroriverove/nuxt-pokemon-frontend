export const capitalizedLabel = (label: string) => {
  const convertLabelText = label.toString()

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}

export const resolvePokemonTypes = (type: string) => {
  if (type === 'normal')
    return { name: 'normal', color: '#8D6E63', icon: 'mdi-omega' }
  if (type === 'fire')
    return { name: 'fuego', color: '#EF5350', icon: 'mdi-fire' }
  if (type === 'water')
    return { name: 'agua', color: '#5C6BC0', icon: 'mdi-waves' }
  if (type === 'grass')
    return { name: 'planta', color: '#66BB6A', icon: 'mdi-grass' }
  if (type === 'electric')
    return { name: 'electrico', color: '#C79100', icon: 'mdi-lightning-bolt-circle' }
  if (type === 'ice')
    return { name: 'hielo', color: '#2196F3', icon: 'mdi-skate' }
  if (type === 'fighting')
    return { name: 'lucha', color: '#BA68C8', icon: 'mdi-dumbbell' }
  if (type === 'poison')
    return { name: 'veneno', color: '#FF7043', icon: 'mdi-deathly-hallows' }
  if (type === 'ground')
    return { name: 'tierra', color: '#00897B', icon: 'mdi-dots-hexagon' }
  if (type === 'flying')
    return { name: 'volador', color: '#546E7A', icon: 'mdi-bee' }
  if (type === 'psychic')
    return { name: 'psiquico', color: '#FFC107', icon: 'mdi-bullseye' }
  if (type === 'bug')
    return { name: 'bicho', color: '#CDDC39', icon: 'mdi-bug' }
  if (type === 'rock')
    return { name: 'roca', color: '#9E9E9E', icon: 'mdi-mirror' }
  if (type === 'ghost')
    return { name: 'fantasma', color: '#1B5E20', icon: 'mdi-ghost' }
  if (type === 'dark')
    return { name: 'siniestro', color: '#009688', icon: 'mdi-brightness-6' }
  if (type === 'dragon')
    return { name: 'dragon', color: '#FFFF00', icon: 'mdi-jellyfish' }
  if (type === 'steel')
    return { name: 'acero', color: '#607D8B', icon: 'mdi-anvil' }
  if (type === 'fairy')
    return { name: 'hada', color: '#9575CD', icon: 'mdi-string-lights' }

  return { name: 'undefined', color: 'info', icon: 'mdi-record' }
}

export const convertBase = (value: number) => {
  return value / 10
}

export const resolvePokemonStats = (name: string) => {
  if (name === 'hp')
    return { title: 'PS' }
  if (name === 'attack')
    return { title: 'Ataque' }
  if (name === 'defense')
    return { title: 'Defensa' }
  if (name === 'special-attack')
    return { title: 'Ataque especial' }
  if (name === 'special-defense')
    return { title: 'Defensa especial' }
  if (name === 'speed')
    return { title: 'Velocidad' }

  return { title: 'undefined' }
}
