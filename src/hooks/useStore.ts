import {useMemo} from "react";
import rootStore from "../store/rootStore";

export const useStore = () => useMemo(() => rootStore, [])