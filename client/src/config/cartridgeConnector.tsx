import { Connector } from "@starknet-react/core";
import { ControllerConnector } from "@cartridge/connector";
import { ColorMode, SessionPolicies, ControllerOptions, } from "@cartridge/controller";
import { constants } from "starknet";

const { VITE_PUBLIC_DEPLOY_TYPE } = import.meta.env;
const { VITE_PUBLIC_SLOT_ADDRESS } = import.meta.env;

const CONTRACT_ADDRESS_TAMAGOTCHI_SYSTEM = '0x479c61a114b253ae1a55298cd05fb7033a48a692bfc483f85e9788950d5a0eb'
const CONTRACT_ADDRESS_PLAYER_SYSTEM = '0x63fae743e894159c53c7854a42d4aac040560accb99100684415c282800cdc0'

const policies: SessionPolicies = {
  contracts: {
    [CONTRACT_ADDRESS_TAMAGOTCHI_SYSTEM]: {
      methods: [
        { name: "awake", entrypoint: "awake" },
        { name: "clean", entrypoint: "clean" },
        { name: "feed", entrypoint: "feed" },
        { name: "get_beast_age", entrypoint: "get_beast_age" },
        { name: "get_beast_age_with_address", entrypoint: "get_beast_age_with_address" },
        { name: "get_timestamp_based_status", entrypoint: "get_timestamp_based_status" },
        { name: "get_timestamp_based_status_with_address", entrypoint: "get_timestamp_based_status_with_address" },
        { name: "pet", entrypoint: "pet" },
        { name: "play", entrypoint: "play" },
        { name: "revive", entrypoint: "revive" },
        { name: "sleep", entrypoint: "sleep" },
        { name: "spawn_beast", entrypoint: "spawn_beast" },
        { name: "update_beast", entrypoint: "update_beast" },
        { name: "update_food_amount", entrypoint: "update_food_amount" },
      ],
    },

    [CONTRACT_ADDRESS_PLAYER_SYSTEM]: {
      methods: [
        {
          name: "add_initial_food",
          entrypoint: "add_initial_food"
        },
        {
          name: "set_current_beast",
          entrypoint: "set_current_beast"
        },
        {
          name: "spawn_player",
          entrypoint: "spawn_player"
        },
        {
          name: "update_player_daily_streak",
          entrypoint: "update_player_daily_streak"
        },
        {
          name: "update_player_total_points",
          entrypoint: "update_player_total_points"
        },
        {
          name: "add_or_update_food_amount",
          entrypoint: "add_or_update_food_amount"
        },
        {
          name: "update_player_minigame_highest_score",
          entrypoint: "update_player_minigame_highest_score"
        },
        {
          name: "emit_player_push_token",
          entrypoint: "emit_player_push_token"
        },
      ],
    },
  },
}

// Controller basic configuration
const colorMode: ColorMode = "dark";
const theme = "bytebeasts-tamagotchi";
const namespace = "tamagotchi"; //ensure this is correct
const slot = `bytebeasts-tamagotchi-${VITE_PUBLIC_DEPLOY_TYPE || 'dev'}`; //ensure bytebeasts-tamagotchi this is correct

const getRpcUrl = () => {
  switch (VITE_PUBLIC_DEPLOY_TYPE) {
    case "mainnet":
      return "https://api.cartridge.gg/x/starknet/mainnet";
    case "sepolia":
      return "https://api.cartridge.gg/x/starknet/sepolia";
    default:
      return VITE_PUBLIC_SLOT_ADDRESS;
  }
};

const options: ControllerOptions = {
  rpc: getRpcUrl(),
  // @ts-ignore
  chains: [
    {
      rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
    },
  ],
  defaultChainId: VITE_PUBLIC_DEPLOY_TYPE === 'mainnet' ?  constants.StarknetChainId.SN_MAIN : constants.StarknetChainId.SN_SEPOLIA,
  policies,
  theme,
  colorMode,
  namespace: "tamagotchi", 
  slot: "newbbtamagotchiachiev", 
};

const cartridgeConnector = new ControllerConnector(
  options,
) as never as Connector;

export default cartridgeConnector;
