import { View } from "react-native";

type Props = {
  onResume: () => void;
};

export default function PauseOverlay({
  onResume,
}: Props) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
      }}
    />
  );
}