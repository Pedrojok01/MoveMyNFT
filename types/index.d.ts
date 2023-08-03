/**********************************************************
                           CONTEXT
***********************************************************/

interface UserContext {
    address?: `0x${string}` | undefined;
    chainId: number;
    isConnected: boolean;
    fetchWeb3Data: () => void;
}

type DisplayPane = "start" | "selectCollection" | "nfts" | "transfer" | "done";

interface FetchedData {
    data: {
        collections: CollectionExtended[];
        userNfts: {
            nfts: EvmNft[];
            total: number;
        };
    };
    message: string;
    success: boolean;
}

/**********************************************************
                            LAYOUT
***********************************************************/

type MenuItem = Required<MenuProps>["items"][number];

interface AddressProps {
    style: CSSProperties | undefined;
    avatar: string;
    size: number | undefined;
    copyable: boolean;
    account: string;
}

type ConnectModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type DisconnectModalProps = {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

/**********************************************************
                        Collections
***********************************************************/

interface Collection {
    contract_type: string;
    name: string;
    possible_spam: boolean;
    symbol: string;
    token_address: string;
    verified_collection: boolean;
}

interface CollectionExtended extends Collection {
    image: string | undefined;
    uuid: string;
    nfts: nft[];
}

type Collections = CollectionExtended[];

/**********************************************************
                           NFTs
***********************************************************/

interface EvmNft {
    amount: string;
    block_number: string;
    block_number_minted: string;
    contract_type: string;
    last_metadata_sync: string;
    last_token_uri_sync: string;
    metadata: string;
    name: string;
    normalized_metadata: NormalizedMetadata;
    owner_of: string;
    possible_spam: boolean;
    symbol: string;
    token_address: string;
    token_hash: string;
    token_id: string;
    token_uri: string;
    verified_collection: boolean;
}

type NormalizedMetadata = {
    animation_url: string | null;
    attributes: any[];
    description: string;
    external_link: string | null;
    image: string;
    name: string;
};

interface Nft extends EvmNft {
    image: string;
}

type Nfts = {
    nfts: EvmNft[];
    total: number;
};
/**********************************************************
                        TEMPLATE PROPS
***********************************************************/

interface CollectionSelectionProps {
    setCollection: Dispatch<SetStateAction<CollectionExtended | undefined>>;
}

interface DisplayNFTProps {
    item: DisplayedNFT;
    index: number;
    isNFTSelected: (currentNft: DisplayedNFT) => boolean;
    handleClickCard: (clickedNFT: DisplayedNFT) => void;
}
type DisplayedNFT = Nft | CollectionExtended;

interface NFTSelectionProps {
    collection: CollectionExtended;
}

interface TransferProps {
    collectionAddress: string | undefined;
    getAddressFromTransfer: (value: SetStateAction<string>) => void;
}

interface DoneProps {
    address: string;
    onReset: () => void;
}

/**********************************************************
                        DIVERS
***********************************************************/

type MenuItem = Required<MenuProps>["items"][number];

interface Item {
    label: string;
    key: string;
    icon: JSX.Element;
}

interface CollectionSelectorProps {
    setNftsDisplayed: React.Dispatch<React.SetStateAction<Nft[]>>;
}

interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName?: string;
    nativeCurrency?: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: number;
    };
    rpcUrls?: (string | undefined)[];
    blockExplorerUrls?: (string | undefined)[];
    iconUrls?: string[]; // Currently ignored.
}
