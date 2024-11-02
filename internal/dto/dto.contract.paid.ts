import { Address } from "viem";


export interface PaidArgs{
  _from: Address
  _value: number
  timestamp: number
}