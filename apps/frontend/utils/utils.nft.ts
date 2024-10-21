import type { ImplementedContract, Web3NFT } from '~/types/web3'
import type { Ref } from 'vue'

const NftShouldBeRef = new Error('nft should be ref!')
const UnknownContractName = (contract: string) =>
  new Error(`unkown contract name :: ${contract}`)

type Shorthanded = {
  category: ComputedRef<string> | string
  image: ComputedRef<string> | string
  name: ComputedRef<string> | string
}

const shorthands = {
  MysteryBox: shorthandBox,
  Potions: shorthandPotion,
  Zombies: shorthandZombie
} as Record<ImplementedContract, (nft: Ref<Web3NFT>) => Partial<Shorthanded>>

export function useShorthandNft(nft: Ref<Web3NFT>) {
  if (!nft.value) {
    return {
      category: '',
      image: '',
      name: ''
    }
  }
  if (!isRef(nft)) {
    throw NftShouldBeRef
  }
  const commonShorthands = shorthandCommon(nft)
  const scopedShorthand = shorthands[nft.value?.contractName]
  if (scopedShorthand === null) {
    throw UnknownContractName(nft.value?.contractName)
  }
  return {
    ...commonShorthands,
    ...scopedShorthand(nft)
  }
}

function shorthandCommon(nft: Ref<Web3NFT>) {
  const image = computed(
    () => nft.value?.tokenData?.images?.original_400x400_aws
  )
  const name = computed(() => nft.value?.tokenData?.name)
  return {
    image,
    name
  }
}

function shorthandZombie(nft: Ref<Web3NFT>) {
  const isKid = () => !nft.value?.metadata?.isAdult
  return {
    category: computed(
      () =>
        `Character • Zombie • ${
          isKid() ? 'Kid' : nft.value?.metadata?.sex ? 'Male' : 'Female'
        }`
    )
  }
}

function shorthandPotion(nft: Ref<Web3NFT>) {
  return {
    category: computed(() => `Potions • Grade ${nft.value.metadata.level}`),
    image: computed(() =>
      nft.value.tokenData?.images?.original_400x400_aws
        ? nft.value.tokenData?.images?.original_400x400_aws
        : `https://cdn.undeads.com/assets/potions/potion-0${nft.value.metadata.level}.png`
    )
  }
}

function shorthandBox(nft: Ref<Web3NFT>) {
  const isLegendBox = computed(() => nft.value.metadata.rarity)
  return {
    category: computed(
      () => `Boxes • ${isLegendBox.value ? 'Legendary' : 'Mystery'}`
    ),
    image: computed(() =>
      isLegendBox.value
        ? 'https://cdn.undeads.com/assets/boxes/box-legend.png'
        : 'https://assets.undeads.com/nfts/mystery-boxes/mystery/original.jpg'
    )
  }
}

export const RARITY = {
  COMMON: [0.8, 1.149],
  UNCOMMON: [1.15, 1.269],
  RARE: [1.27, 1.389],
  EPIC: [1.39, 1.489],
  LEGENDARY: [1.49, 1.5]
}

export const RARITY_LEVEL = {
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  EPIC: 4,
  LEGENDARY: 5
}

function inInterval(value: number, interval: number[]) {
  if (interval.length !== 2) throw new Error('Interval length should be === 2')
  const [to, from] = interval
  return value >= to && value <= from
}

export function parseRank(rank: number) {
  if (!Number.isInteger(rank)) return
  const divided = rank / 1000
  if (inInterval(divided, RARITY.COMMON)) return 'Common'
  else if (inInterval(divided, RARITY.UNCOMMON)) return 'Uncommon'
  else if (inInterval(divided, RARITY.RARE)) return 'Rare'
  else if (inInterval(divided, RARITY.EPIC)) return 'Epic'
  else if (inInterval(divided, RARITY.LEGENDARY)) return 'Legendary'
  else throw new Error(`Unknown rarity: ${rank}`)
}

export function rare2level(rawLevel: string) {
  return (
    RARITY_LEVEL?.[rawLevel.toUpperCase() as keyof typeof RARITY_LEVEL] ?? -1
  )
}

export function sanitizeLevel(level: number) {
  switch (level) {
    case 1:
      return 'COMMON'
    case 2:
      return 'UNCOMMON'
    case 3:
      return 'RARE'
    case 4:
      return 'EPIC'
    case 5:
      return 'LEGENDARY'
    default:
      return 'UNKNOWN'
  }
}

export function parseLevel(level: number) {
  const sanitizedLevel = sanitizeLevel(level).toLowerCase()
  return sanitizedLevel.charAt(0).toUpperCase() + sanitizedLevel.slice(1)
}
