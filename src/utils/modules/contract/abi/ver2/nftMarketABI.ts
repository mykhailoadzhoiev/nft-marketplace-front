import { AbiItem } from 'web3-utils'

export default [
    {
        inputs: [
            {
                internalType: 'contract IERC20',
                name: '_paymentToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_backendAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'creator',
                        type: 'address',
                    },
                    {
                        internalType: 'uint8',
                        name: 'creatorReward',
                        type: 'uint8',
                    },
                    { internalType: 'address', name: 'maker', type: 'address' },
                    { internalType: 'address', name: 'taker', type: 'address' },
                    {
                        internalType: 'bool',
                        name: 'isFixedPrice',
                        type: 'bool',
                    },
                    { internalType: 'uint256', name: 'price', type: 'uint256' },
                    { internalType: 'uint256', name: 'extra', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'itemId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'contract IERC721',
                        name: 'itemContract',
                        type: 'address',
                    },
                ],
                indexed: false,
                internalType: 'struct AtomicMatcher.Order',
                name: 'order',
                type: 'tuple',
            },
        ],
        name: 'OrderMatched',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'creator',
                        type: 'address',
                    },
                    {
                        internalType: 'uint8',
                        name: 'creatorReward',
                        type: 'uint8',
                    },
                    { internalType: 'address', name: 'maker', type: 'address' },
                    { internalType: 'address', name: 'taker', type: 'address' },
                    {
                        internalType: 'bool',
                        name: 'isFixedPrice',
                        type: 'bool',
                    },
                    { internalType: 'uint256', name: 'price', type: 'uint256' },
                    { internalType: 'uint256', name: 'extra', type: 'uint256' },
                    {
                        internalType: 'uint256',
                        name: 'itemId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'contract IERC721',
                        name: 'itemContract',
                        type: 'address',
                    },
                ],
                internalType: 'struct AtomicMatcher.Order',
                name: 'order',
                type: 'tuple',
            },
            { internalType: 'bytes', name: 'buyerSignature', type: 'bytes' },
            { internalType: 'bytes', name: 'sellerSignature', type: 'bytes' },
        ],
        name: 'atomicMatch',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_feeTakerAddress1',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_feeTakerAddress2',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_feeTakerAddress3',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_backendAddress',
                type: 'address',
            },
        ],
        name: 'changeAddresses',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'feeTakerAddress1',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'feeTakerAddress2',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'feeTakerAddress3',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'paymentToken',
        outputs: [
            { internalType: 'contract IERC20', name: '', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as AbiItem[]
