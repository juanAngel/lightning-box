
declare module "lnd-grpc-messages"{
/**
 * `AddressType` has to be one of:
 *
 * - `p2wkh`: Pay to witness key hash (`WITNESS_PUBKEY_HASH` = 0)
 * - `np2wkh`: Pay to nested witness key hash (`NESTED_PUBKEY_HASH` = 1)
 */
 export enum AddressType {
    WITNESS_PUBKEY_HASH = 0,
    NESTED_PUBKEY_HASH = 1,
    UNUSED_WITNESS_PUBKEY_HASH = 2,
    UNUSED_NESTED_PUBKEY_HASH = 3,
    UNRECOGNIZED = -1,
  }

export enum CommitmentType {
    /** UNKNOWN_COMMITMENT_TYPE - Returned when the commitment type isn't known or unavailable. */
    UNKNOWN_COMMITMENT_TYPE = 0,
    /**
     * LEGACY - A channel using the legacy commitment format having tweaked to_remote
     * keys.
     */
    LEGACY = 1,
    /**
     * STATIC_REMOTE_KEY - A channel that uses the modern commitment format where the key in the
     * output of the remote party does not change each state. This makes back
     * up and recovery easier as when the channel is closed, the funds go
     * directly to that key.
     */
    STATIC_REMOTE_KEY = 2,
    /**
     * ANCHORS - A channel that uses a commitment format that has anchor outputs on the
     * commitments, allowing fee bumping after a force close transaction has
     * been broadcast.
     */
    ANCHORS = 3,
    /**
     * SCRIPT_ENFORCED_LEASE - A channel that uses a commitment type that builds upon the anchors
     * commitment format, but in addition requires a CLTV clause to spend outputs
     * paying to the channel initiator. This is intended for use on leased channels
     * to guarantee that the channel initiator has no incentives to close a leased
     * channel before its maturity date.
     */
    SCRIPT_ENFORCED_LEASE = 4,
    UNRECOGNIZED = -1,
}

export enum Initiator {
    INITIATOR_UNKNOWN = 0,
    INITIATOR_LOCAL = 1,
    INITIATOR_REMOTE = 2,
    INITIATOR_BOTH = 3,
    UNRECOGNIZED = -1,
}

export enum ResolutionType {
    TYPE_UNKNOWN = 0,
    /** ANCHOR - We resolved an anchor output. */
    ANCHOR = 1,
    /**
     * INCOMING_HTLC - We are resolving an incoming htlc on chain. This if this htlc is
     * claimed, we swept the incoming htlc with the preimage. If it is timed
     * out, our peer swept the timeout path.
     */
    INCOMING_HTLC = 2,
    /**
     * OUTGOING_HTLC - We are resolving an outgoing htlc on chain. If this htlc is claimed,
     * the remote party swept the htlc with the preimage. If it is timed out,
     * we swept it with the timeout path.
     */
    OUTGOING_HTLC = 3,
    /** COMMIT - We force closed and need to sweep our time locked commitment output. */
    COMMIT = 4,
    UNRECOGNIZED = -1,
}

export enum ResolutionOutcome {
    /** OUTCOME_UNKNOWN - Outcome unknown. */
    OUTCOME_UNKNOWN = 0,
    /** CLAIMED - An output was claimed on chain. */
    CLAIMED = 1,
    /** UNCLAIMED - An output was left unclaimed on chain. */
    UNCLAIMED = 2,
    /**
     * ABANDONED - ResolverOutcomeAbandoned indicates that an output that we did not
     * claim on chain, for example an anchor that we did not sweep and a
     * third party claimed on chain, or a htlc that we could not decode
     * so left unclaimed.
     */
    ABANDONED = 3,
    /**
     * FIRST_STAGE - If we force closed our channel, our htlcs need to be claimed in two
     * stages. This outcome represents the broadcast of a timeout or success
     * transaction for this two stage htlc claim.
     */
    FIRST_STAGE = 4,
    /** TIMEOUT - A htlc was timed out on chain. */
    TIMEOUT = 5,
    UNRECOGNIZED = -1,
}


export enum NodeMetricType {
    UNKNOWN = 0,
    BETWEENNESS_CENTRALITY = 1,
    UNRECOGNIZED = -1,
}


export enum InvoiceHTLCState {
    ACCEPTED = 0,
    SETTLED = 1,
    CANCELED = 2,
    UNRECOGNIZED = -1,
  }

export enum PaymentFailureReason {
    /** FAILURE_REASON_NONE - Payment isn't failed (yet). */
    FAILURE_REASON_NONE = 0,
    /** FAILURE_REASON_TIMEOUT - There are more routes to try, but the payment timeout was exceeded. */
    FAILURE_REASON_TIMEOUT = 1,
    /**
     * FAILURE_REASON_NO_ROUTE - All possible routes were tried and failed permanently. Or were no
     * routes to the destination at all.
     */
    FAILURE_REASON_NO_ROUTE = 2,
    /** FAILURE_REASON_ERROR - A non-recoverable error has occured. */
    FAILURE_REASON_ERROR = 3,
    /**
     * FAILURE_REASON_INCORRECT_PAYMENT_DETAILS - Payment details incorrect (unknown hash, invalid amt or
     * invalid final cltv delta)
     */
    FAILURE_REASON_INCORRECT_PAYMENT_DETAILS = 4,
    /** FAILURE_REASON_INSUFFICIENT_BALANCE - Insufficient local balance. */
    FAILURE_REASON_INSUFFICIENT_BALANCE = 5,
    UNRECOGNIZED = -1,
}

export enum FeatureBit {
    DATALOSS_PROTECT_REQ = 0,
    DATALOSS_PROTECT_OPT = 1,
    INITIAL_ROUING_SYNC = 3,
    UPFRONT_SHUTDOWN_SCRIPT_REQ = 4,
    UPFRONT_SHUTDOWN_SCRIPT_OPT = 5,
    GOSSIP_QUERIES_REQ = 6,
    GOSSIP_QUERIES_OPT = 7,
    TLV_ONION_REQ = 8,
    TLV_ONION_OPT = 9,
    EXT_GOSSIP_QUERIES_REQ = 10,
    EXT_GOSSIP_QUERIES_OPT = 11,
    STATIC_REMOTE_KEY_REQ = 12,
    STATIC_REMOTE_KEY_OPT = 13,
    PAYMENT_ADDR_REQ = 14,
    PAYMENT_ADDR_OPT = 15,
    MPP_REQ = 16,
    MPP_OPT = 17,
    WUMBO_CHANNELS_REQ = 18,
    WUMBO_CHANNELS_OPT = 19,
    ANCHORS_REQ = 20,
    ANCHORS_OPT = 21,
    ANCHORS_ZERO_FEE_HTLC_REQ = 22,
    ANCHORS_ZERO_FEE_HTLC_OPT = 23,
    AMP_REQ = 30,
    AMP_OPT = 31,
    UNRECOGNIZED = -1,
}

export enum UpdateFailure {
    UPDATE_FAILURE_UNKNOWN = 0,
    UPDATE_FAILURE_PENDING = 1,
    UPDATE_FAILURE_NOT_FOUND = 2,
    UPDATE_FAILURE_INTERNAL_ERR = 3,
    UPDATE_FAILURE_INVALID_PARAMETER = 4,
    UNRECOGNIZED = -1,
  }
export interface SubscribeCustomMessagesRequest {}

export interface CustomMessage {
  /** Peer from which the message originates */
  peer: Uint8Array;
  /** Message type. This value will be in the custom range (>= 32768). */
  type: number;
  /** Raw message data */
  data: Uint8Array;
}

export interface SendCustomMessageRequest {
  /** Peer to send the message to */
  peer: Uint8Array;
  /** Message type. This value needs to be in the custom range (>= 32768). */
  type: number;
  /** Raw message data. */
  data: Uint8Array;
}

export interface SendCustomMessageResponse {}

export interface Utxo {
  /** The type of address */
  addressType: AddressType;
  /** The address */
  address: string;
  /** The value of the unspent coin in satoshis */
  amountSat: number;
  /** The pkscript in hex */
  pkScript: string;
  /** The outpoint in format txid:n */
  outpoint: OutPoint | undefined;
  /** The number of confirmations for the Utxo */
  confirmations: number;
}

export interface Transaction {
  /** The transaction hash */
  txHash: string;
  /** The transaction amount, denominated in satoshis */
  amount: number;
  /** The number of confirmations */
  numConfirmations: number;
  /** The hash of the block this transaction was included in */
  blockHash: string;
  /** The height of the block this transaction was included in */
  blockHeight: number;
  /** Timestamp of this transaction */
  timeStamp: number;
  /** Fees paid for this transaction */
  totalFees: number;
  /** Addresses that received funds for this transaction */
  destAddresses: string[];
  /** The raw transaction hex. */
  rawTxHex: string;
  /** A label that was optionally set on transaction broadcast. */
  label: string;
}

export interface GetTransactionsRequest {
  /**
   * The height from which to list transactions, inclusive. If this value is
   * greater than end_height, transactions will be read in reverse.
   */
  startHeight: number;
  /**
   * The height until which to list transactions, inclusive. To include
   * unconfirmed transactions, this value should be set to -1, which will
   * return transactions from start_height until the current chain tip and
   * unconfirmed transactions. If no end_height is provided, the call will
   * default to this option.
   */
  endHeight: number;
  /** An optional filter to only include transactions relevant to an account. */
  account: string;
}

export interface TransactionDetails {
  /** The list of transactions relevant to the wallet. */
  transactions: Transaction[];
}

export interface FeeLimit {
  /**
   * The fee limit expressed as a fixed amount of satoshis.
   *
   * The fields fixed and fixed_msat are mutually exclusive.
   */
  fixed: number | undefined;
  /**
   * The fee limit expressed as a fixed amount of millisatoshis.
   *
   * The fields fixed and fixed_msat are mutually exclusive.
   */
  fixedMsat: number | undefined;
  /** The fee limit expressed as a percentage of the payment amount. */
  percent: number | undefined;
}

export interface SendRequest {
  /**
   * The identity pubkey of the payment recipient. When using REST, this field
   * must be encoded as base64.
   */
  dest: Uint8Array;
  /**
   * The hex-encoded identity pubkey of the payment recipient. Deprecated now
   * that the REST gateway supports base64 encoding of bytes fields.
   *
   * @deprecated
   */
  destString: string;
  /**
   * The amount to send expressed in satoshis.
   *
   * The fields amt and amt_msat are mutually exclusive.
   */
  amt: number;
  /**
   * The amount to send expressed in millisatoshis.
   *
   * The fields amt and amt_msat are mutually exclusive.
   */
  amtMsat: number;
  /**
   * The hash to use within the payment's HTLC. When using REST, this field
   * must be encoded as base64.
   */
  paymentHash: Uint8Array;
  /**
   * The hex-encoded hash to use within the payment's HTLC. Deprecated now
   * that the REST gateway supports base64 encoding of bytes fields.
   *
   * @deprecated
   */
  paymentHashString: string;
  /**
   * A bare-bones invoice for a payment within the Lightning Network. With the
   * details of the invoice, the sender has all the data necessary to send a
   * payment to the recipient.
   */
  paymentRequest: string;
  /**
   * The CLTV delta from the current height that should be used to set the
   * timelock for the final hop.
   */
  finalCltvDelta: number;
  /**
   * The maximum number of satoshis that will be paid as a fee of the payment.
   * This value can be represented either as a percentage of the amount being
   * sent, or as a fixed amount of the maximum fee the user is willing the pay to
   * send the payment.
   */
  feeLimit: FeeLimit | undefined;
  /**
   * The channel id of the channel that must be taken to the first hop. If zero,
   * any channel may be used.
   */
  outgoingChanId: number;
  /** The pubkey of the last hop of the route. If empty, any hop may be used. */
  lastHopPubkey: Uint8Array;
  /**
   * An optional maximum total time lock for the route. This should not exceed
   * lnd's `--max-cltv-expiry` setting. If zero, then the value of
   * `--max-cltv-expiry` is enforced.
   */
  cltvLimit: number;
  /**
   * An optional field that can be used to pass an arbitrary set of TLV records
   * to a peer which understands the new records. This can be used to pass
   * application specific data during the payment attempt. Record types are
   * required to be in the custom range >= 65536. When using REST, the values
   * must be encoded as base64.
   */
  destCustomRecords: { [key: number]: Uint8Array };
  /** If set, circular payments to self are permitted. */
  allowSelfPayment: boolean;
  /**
   * Features assumed to be supported by the final node. All transitive feature
   * dependencies must also be set properly. For a given feature bit pair, either
   * optional or remote may be set, but not both. If this field is nil or empty,
   * the router will try to load destination features from the graph as a
   * fallback.
   */
  destFeatures: FeatureBit[];
  /** The payment address of the generated invoice. */
  paymentAddr: Uint8Array;
}

export interface SendResponse {
    paymentError: string;
    paymentPreimage: Uint8Array;
    paymentRoute: Route | undefined;
    paymentHash: Uint8Array;
  }
  
  export interface SendToRouteRequest {
    /**
     * The payment hash to use for the HTLC. When using REST, this field must be
     * encoded as base64.
     */
    paymentHash: Uint8Array;
    /**
     * An optional hex-encoded payment hash to be used for the HTLC. Deprecated now
     * that the REST gateway supports base64 encoding of bytes fields.
     *
     * @deprecated
     */
    paymentHashString: string;
    /** Route that should be used to attempt to complete the payment. */
    route: Route | undefined;
  }
  
  export interface ChannelAcceptRequest {
    /** The pubkey of the node that wishes to open an inbound channel. */
    nodePubkey: Uint8Array;
    /** The hash of the genesis block that the proposed channel resides in. */
    chainHash: Uint8Array;
    /** The pending channel id. */
    pendingChanId: Uint8Array;
    /**
     * The funding amount in satoshis that initiator wishes to use in the
     * channel.
     */
    fundingAmt: number;
    /** The push amount of the proposed channel in millisatoshis. */
    pushAmt: number;
    /** The dust limit of the initiator's commitment tx. */
    dustLimit: number;
    /**
     * The maximum amount of coins in millisatoshis that can be pending in this
     * channel.
     */
    maxValueInFlight: number;
    /**
     * The minimum amount of satoshis the initiator requires us to have at all
     * times.
     */
    channelReserve: number;
    /** The smallest HTLC in millisatoshis that the initiator will accept. */
    minHtlc: number;
    /**
     * The initial fee rate that the initiator suggests for both commitment
     * transactions.
     */
    feePerKw: number;
    /**
     * The number of blocks to use for the relative time lock in the pay-to-self
     * output of both commitment transactions.
     */
    csvDelay: number;
    /** The total number of incoming HTLC's that the initiator will accept. */
    maxAcceptedHtlcs: number;
    /**
     * A bit-field which the initiator uses to specify proposed channel
     * behavior.
     */
    channelFlags: number;
    /** The commitment type the initiator wishes to use for the proposed channel. */
    commitmentType: CommitmentType;
  }
  
  export interface ChannelAcceptResponse {
    /** Whether or not the client accepts the channel. */
    accept: boolean;
    /** The pending channel id to which this response applies. */
    pendingChanId: Uint8Array;
    /**
     * An optional error to send the initiating party to indicate why the channel
     * was rejected. This field *should not* contain sensitive information, it will
     * be sent to the initiating party. This field should only be set if accept is
     * false, the channel will be rejected if an error is set with accept=true
     * because the meaning of this response is ambiguous. Limited to 500
     * characters.
     */
    error: string;
    /**
     * The upfront shutdown address to use if the initiating peer supports option
     * upfront shutdown script (see ListPeers for the features supported). Note
     * that the channel open will fail if this value is set for a peer that does
     * not support this feature bit.
     */
    upfrontShutdown: string;
    /** The csv delay (in blocks) that we require for the remote party. */
    csvDelay: number;
    /**
     * The reserve amount in satoshis that we require the remote peer to adhere to.
     * We require that the remote peer always have some reserve amount allocated to
     * them so that there is always a disincentive to broadcast old state (if they
     * hold 0 sats on their side of the channel, there is nothing to lose).
     */
    reserveSat: number;
    /**
     * The maximum amount of funds in millisatoshis that we allow the remote peer
     * to have in outstanding htlcs.
     */
    inFlightMaxMsat: number;
    /** The maximum number of htlcs that the remote peer can offer us. */
    maxHtlcCount: number;
    /** The minimum value in millisatoshis for incoming htlcs on the channel. */
    minHtlcIn: number;
    /** The number of confirmations we require before we consider the channel open. */
    minAcceptDepth: number;
  }
  
  export interface ChannelPoint {
    /**
     * Txid of the funding transaction. When using REST, this field must be
     * encoded as base64.
     */
    fundingTxidBytes: Uint8Array | undefined;
    /**
     * Hex-encoded string representing the byte-reversed hash of the funding
     * transaction.
     */
    fundingTxidStr: string | undefined;
    /** The index of the output of the funding transaction */
    outputIndex: number;
  }
  
  export interface OutPoint {
    /** Raw bytes representing the transaction id. */
    txidBytes: Uint8Array;
    /** Reversed, hex-encoded string representing the transaction id. */
    txidStr: string;
    /** The index of the output on the transaction. */
    outputIndex: number;
  }
  
  export interface LightningAddress {
    /** The identity pubkey of the Lightning node */
    pubkey: string;
    /**
     * The network location of the lightning node, e.g. `69.69.69.69:1337` or
     * `localhost:10011`
     */
    host: string;
}

export interface EstimateFeeRequest {
    /** The map from addresses to amounts for the transaction. */
    AddrToAmount: { [key: string]: number };
    /**
     * The target number of blocks that this transaction should be confirmed
     * by.
     */
    targetConf: number;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the transaction must satisfy.
     */
    minConfs: number;
    /** Whether unconfirmed outputs should be used as inputs for the transaction. */
    spendUnconfirmed: boolean;
}
export interface EstimateFeeResponse {
    /** The total fee in satoshis. */
    feeSat: number;
    /**
     * Deprecated, use sat_per_vbyte.
     * The fee rate in satoshi/vbyte.
     *
     * @deprecated
     */
    feerateSatPerByte: number;
    /** The fee rate in satoshi/vbyte. */
    satPerVbyte: number;
  }
  
  export interface SendManyRequest {
    /** The map from addresses to amounts */
    AddrToAmount: { [key: string]: number };
    /**
     * The target number of blocks that this transaction should be confirmed
     * by.
     */
    targetConf: number;
    /**
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * transaction.
     */
    satPerVbyte: number;
    /**
     * Deprecated, use sat_per_vbyte.
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * transaction.
     *
     * @deprecated
     */
    satPerByte: number;
    /** An optional label for the transaction, limited to 500 characters. */
    label: string;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the transaction must satisfy.
     */
    minConfs: number;
    /** Whether unconfirmed outputs should be used as inputs for the transaction. */
    spendUnconfirmed: boolean;
  }

export interface SendManyResponse {
    /** The id of the transaction */
    txid: string;
  }
  
  export interface SendCoinsRequest {
    /** The address to send coins to */
    addr: string;
    /** The amount in satoshis to send */
    amount: number;
    /**
     * The target number of blocks that this transaction should be confirmed
     * by.
     */
    targetConf: number;
    /**
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * transaction.
     */
    satPerVbyte: number;
    /**
     * Deprecated, use sat_per_vbyte.
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * transaction.
     *
     * @deprecated
     */
    satPerByte: number;
    /**
     * If set, then the amount field will be ignored, and lnd will attempt to
     * send all the coins under control of the internal wallet to the specified
     * address.
     */
    sendAll: boolean;
    /** An optional label for the transaction, limited to 500 characters. */
    label: string;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the transaction must satisfy.
     */
    minConfs: number;
    /** Whether unconfirmed outputs should be used as inputs for the transaction. */
    spendUnconfirmed: boolean;
  }
  
  export interface SendCoinsResponse {
    /** The transaction ID of the transaction */
    txid: string;
  }
  
  export interface ListUnspentRequest {
    /** The minimum number of confirmations to be included. */
    minConfs: number;
    /** The maximum number of confirmations to be included. */
    maxConfs: number;
    /** An optional filter to only include outputs belonging to an account. */
    account: string;
  }
  
  export interface ListUnspentResponse {
    /** A list of utxos */
    utxos: Utxo[];
  }
  
  export interface NewAddressRequest {
    /** The type of address to generate. */
    type: AddressType;
    /**
     * The name of the account to generate a new address for. If empty, the
     * default wallet account is used.
     */
    account: string;
  }
  
  export interface NewAddressResponse {
    /** The newly generated wallet address */
    address: string;
  }
  
  export interface SignMessageRequest {
    /**
     * The message to be signed. When using REST, this field must be encoded as
     * base64.
     */
    msg: Uint8Array;
    /**
     * Instead of the default double-SHA256 hashing of the message before signing,
     * only use one round of hashing instead.
     */
    singleHash: boolean;
  }
  
  export interface SignMessageResponse {
    /** The signature for the given message */
    signature: string;
  }
  
  export interface VerifyMessageRequest {
    /**
     * The message over which the signature is to be verified. When using REST,
     * this field must be encoded as base64.
     */
    msg: Uint8Array;
    /** The signature to be verified over the given message */
    signature: string;
  }
  
  export interface VerifyMessageResponse {
    /** Whether the signature was valid over the given message */
    valid: boolean;
    /** The pubkey recovered from the signature */
    pubkey: string;
  }
  
  export interface ConnectPeerRequest {
    /** Lightning address of the peer, in the format `<pubkey>@host` */
    addr: LightningAddress | undefined;
    /**
     * If set, the daemon will attempt to persistently connect to the target
     * peer. Otherwise, the call will be synchronous.
     */
    perm: boolean;
    /**
     * The connection timeout value (in seconds) for this request. It won't affect
     * other requests.
     */
    timeout: number;
  }

export interface DisconnectPeerRequest {
    /** The pubkey of the node to disconnect from */
    pubKey: string;
}
export interface HTLC {
    incoming: boolean;
    amount: number;
    hashLock: Uint8Array;
    expirationHeight: number;
    /** Index identifying the htlc on the channel. */
    htlcIndex: number;
    /**
     * If this HTLC is involved in a forwarding operation, this field indicates
     * the forwarding channel. For an outgoing htlc, it is the incoming channel.
     * For an incoming htlc, it is the outgoing channel. When the htlc
     * originates from this node or this node is the final destination,
     * forwarding_channel will be zero. The forwarding channel will also be zero
     * for htlcs that need to be forwarded but don't have a forwarding decision
     * persisted yet.
     */
    forwardingChannel: number;
    /** Index identifying the htlc on the forwarding channel. */
    forwardingHtlcIndex: number;
  }
  
  export interface ChannelConstraints {
    /**
     * The CSV delay expressed in relative blocks. If the channel is force closed,
     * we will need to wait for this many blocks before we can regain our funds.
     */
    csvDelay: number;
    /** The minimum satoshis this node is required to reserve in its balance. */
    chanReserveSat: number;
    /** The dust limit (in satoshis) of the initiator's commitment tx. */
    dustLimitSat: number;
    /**
     * The maximum amount of coins in millisatoshis that can be pending in this
     * channel.
     */
    maxPendingAmtMsat: number;
    /** The smallest HTLC in millisatoshis that the initiator will accept. */
    minHtlcMsat: number;
    /** The total number of incoming HTLC's that the initiator will accept. */
    maxAcceptedHtlcs: number;
  }
  
  export interface Channel {
    /** Whether this channel is active or not */
    active: boolean;
    /** The identity pubkey of the remote node */
    remotePubkey: string;
    /**
     * The outpoint (txid:index) of the funding transaction. With this value, Bob
     * will be able to generate a signature for Alice's version of the commitment
     * transaction.
     */
    channelPoint: string;
    /**
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     */
    chanId: number;
    /** The total amount of funds held in this channel */
    capacity: number;
    /** This node's current balance in this channel */
    localBalance: number;
    /** The counterparty's current balance in this channel */
    remoteBalance: number;
    /**
     * The amount calculated to be paid in fees for the current set of commitment
     * transactions. The fee amount is persisted with the channel in order to
     * allow the fee amount to be removed and recalculated with each channel state
     * update, including updates that happen after a system restart.
     */
    commitFee: number;
    /** The weight of the commitment transaction */
    commitWeight: number;
    /**
     * The required number of satoshis per kilo-weight that the requester will pay
     * at all times, for both the funding transaction and commitment transaction.
     * This value can later be updated once the channel is open.
     */
    feePerKw: number;
    /** The unsettled balance in this channel */
    unsettledBalance: number;
    /** The total number of satoshis we've sent within this channel. */
    totalSatoshisSent: number;
    /** The total number of satoshis we've received within this channel. */
    totalSatoshisReceived: number;
    /** The total number of updates conducted within this channel. */
    numUpdates: number;
    /** The list of active, uncleared HTLCs currently pending within the channel. */
    pendingHtlcs: HTLC[];
    /**
     * Deprecated. The CSV delay expressed in relative blocks. If the channel is
     * force closed, we will need to wait for this many blocks before we can regain
     * our funds.
     *
     * @deprecated
     */
    csvDelay: number;
    /** Whether this channel is advertised to the network or not. */
    private: boolean;
    /** True if we were the ones that created the channel. */
    initiator: boolean;
    /** A set of flags showing the current state of the channel. */
    chanStatusFlags: string;
    /**
     * Deprecated. The minimum satoshis this node is required to reserve in its
     * balance.
     *
     * @deprecated
     */
    localChanReserveSat: number;
    /**
     * Deprecated. The minimum satoshis the other node is required to reserve in
     * its balance.
     *
     * @deprecated
     */
    remoteChanReserveSat: number;
    /**
     * Deprecated. Use commitment_type.
     *
     * @deprecated
     */
    staticRemoteKey: boolean;
    /** The commitment type used by this channel. */
    commitmentType: CommitmentType;
    /**
     * The number of seconds that the channel has been monitored by the channel
     * scoring system. Scores are currently not persisted, so this value may be
     * less than the lifetime of the channel [EXPERIMENTAL].
     */
    lifetime: number;
    /**
     * The number of seconds that the remote peer has been observed as being online
     * by the channel scoring system over the lifetime of the channel
     * [EXPERIMENTAL].
     */
    uptime: number;
    /**
     * Close address is the address that we will enforce payout to on cooperative
     * close if the channel was opened utilizing option upfront shutdown. This
     * value can be set on channel open by setting close_address in an open channel
     * request. If this value is not set, you can still choose a payout address by
     * cooperatively closing with the delivery_address field set.
     */
    closeAddress: string;
    /**
     * The amount that the initiator of the channel optionally pushed to the remote
     * party on channel open. This amount will be zero if the channel initiator did
     * not push any funds to the remote peer. If the initiator field is true, we
     * pushed this amount to our peer, if it is false, the remote peer pushed this
     * amount to us.
     */
    pushAmountSat: number;
    /**
     * This uint32 indicates if this channel is to be considered 'frozen'. A
     * frozen channel doest not allow a cooperative channel close by the
     * initiator. The thaw_height is the height that this restriction stops
     * applying to the channel. This field is optional, not setting it or using a
     * value of zero will mean the channel has no additional restrictions. The
     * height can be interpreted in two ways: as a relative height if the value is
     * less than 500,000, or as an absolute height otherwise.
     */
    thawHeight: number;
    /** List constraints for the local node. */
    localConstraints: ChannelConstraints | undefined;
    /** List constraints for the remote node. */
    remoteConstraints: ChannelConstraints | undefined;
  }
  
  export interface ListChannelsRequest {
    activeOnly: boolean;
    inactiveOnly: boolean;
    publicOnly: boolean;
    privateOnly: boolean;
    /**
     * Filters the response for channels with a target peer's pubkey. If peer is
     * empty, all channels will be returned.
     */
    peer: Uint8Array;
  }
  
export interface ListChannelsResponse {
    /** The list of active channels */
    channels: Channel[];
}


export interface ChannelCloseSummary {
    /** The outpoint (txid:index) of the funding transaction. */
    channelPoint: string;
    /** The unique channel ID for the channel. */
    chanId: number;
    /** The hash of the genesis block that this channel resides within. */
    chainHash: string;
    /** The txid of the transaction which ultimately closed this channel. */
    closingTxHash: string;
    /** Public key of the remote peer that we formerly had a channel with. */
    remotePubkey: string;
    /** Total capacity of the channel. */
    capacity: number;
    /** Height at which the funding transaction was spent. */
    closeHeight: number;
    /** Settled balance at the time of channel closure */
    settledBalance: number;
    /** The sum of all the time-locked outputs at the time of channel closure */
    timeLockedBalance: number;
    /** Details on how the channel was closed. */
    closeType: /*ChannelCloseSummary_ClosureType*/any;
    /**
     * Open initiator is the party that initiated opening the channel. Note that
     * this value may be unknown if the channel was closed before we migrated to
     * store open channel information after close.
     */
    openInitiator: Initiator;
    /**
     * Close initiator indicates which party initiated the close. This value will
     * be unknown for channels that were cooperatively closed before we started
     * tracking cooperative close initiators. Note that this indicates which party
     * initiated a close, and it is possible for both to initiate cooperative or
     * force closes, although only one party's close will be confirmed on chain.
     */
    closeInitiator: Initiator;
    resolutions: Resolution[];
}

export interface Resolution {
    /** The type of output we are resolving. */
    resolutionType: ResolutionType;
    /** The outcome of our on chain action that resolved the outpoint. */
    outcome: ResolutionOutcome;
    /** The outpoint that was spent by the resolution. */
    outpoint: OutPoint | undefined;
    /** The amount that was claimed by the resolution. */
    amountSat: number;
    /**
     * The hex-encoded transaction ID of the sweep transaction that spent the
     * output.
     */
    sweepTxid: string;
  }
  
  export interface ClosedChannelsRequest {
    cooperative: boolean;
    localForce: boolean;
    remoteForce: boolean;
    breach: boolean;
    fundingCanceled: boolean;
    abandoned: boolean;
  }
  
  export interface ClosedChannelsResponse {
    channels: ChannelCloseSummary[];
  }
  
  export interface Peer {
    /** The identity pubkey of the peer */
    pubKey: string;
    /** Network address of the peer; eg `127.0.0.1:10011` */
    address: string;
    /** Bytes of data transmitted to this peer */
    bytesSent: number;
    /** Bytes of data transmitted from this peer */
    bytesRecv: number;
    /** Satoshis sent to this peer */
    satSent: number;
    /** Satoshis received from this peer */
    satRecv: number;
    /** A channel is inbound if the counterparty initiated the channel */
    inbound: boolean;
    /** Ping time to this peer */
    pingTime: number;
    /** The type of sync we are currently performing with this peer. */
    syncType: Peer_SyncType;
    /** Features advertised by the remote peer in their init message. */
    features: { [key: number]: Feature };
    /**
     * The latest errors received from our peer with timestamps, limited to the 10
     * most recent errors. These errors are tracked across peer connections, but
     * are not persisted across lnd restarts. Note that these errors are only
     * stored for peers that we have channels open with, to prevent peers from
     * spamming us with errors at no cost.
     */
    errors: TimestampedError[];
    /**
     * The number of times we have recorded this peer going offline or coming
     * online, recorded across restarts. Note that this value is decreased over
     * time if the peer has not recently flapped, so that we can forgive peers
     * with historically high flap counts.
     */
    flapCount: number;
    /**
     * The timestamp of the last flap we observed for this peer. If this value is
     * zero, we have not observed any flaps for this peer.
     */
    lastFlapNs: number;
    /** The last ping payload the peer has sent to us. */
    lastPingPayload: Uint8Array;
  }
  
  export enum Peer_SyncType {
    /** UNKNOWN_SYNC - Denotes that we cannot determine the peer's current sync type. */
    UNKNOWN_SYNC = 0,
    /** ACTIVE_SYNC - Denotes that we are actively receiving new graph updates from the peer. */
    ACTIVE_SYNC = 1,
    /** PASSIVE_SYNC - Denotes that we are not receiving new graph updates from the peer. */
    PASSIVE_SYNC = 2,
    /** PINNED_SYNC - Denotes that this peer is pinned into an active sync. */
    PINNED_SYNC = 3,
    UNRECOGNIZED = -1,
  }

  export interface TimestampedError {
    /** The unix timestamp in seconds when the error occurred. */
    timestamp: number;
    /** The string representation of the error sent by our peer. */
    error: string;
  }

export interface GetInfoResponse {
    /** The version of the LND software that the node is running. */
    version: string;
    /** The SHA1 commit hash that the daemon is compiled with. */
    commitHash: string;
    /** The identity pubkey of the current node. */
    identityPubkey: string;
    /** If applicable, the alias of the current node, e.g. "bob" */
    alias: string;
    /** The color of the current node in hex code format */
    color: string;
    /** Number of pending channels */
    numPendingChannels: number;
    /** Number of active channels */
    numActiveChannels: number;
    /** Number of inactive channels */
    numInactiveChannels: number;
    /** Number of peers */
    numPeers: number;
    /** The node's current view of the height of the best block */
    blockHeight: number;
    /** The node's current view of the hash of the best block */
    blockHash: string;
    /** Timestamp of the block best known to the wallet */
    bestHeaderTimestamp: number;
    /** Whether the wallet's view is synced to the main chain */
    syncedToChain: boolean;
    /** Whether we consider ourselves synced with the public channel graph. */
    syncedToGraph: boolean;
    /**
     * Whether the current node is connected to testnet. This field is
     * deprecated and the network field should be used instead
     *
     * @deprecated
     */
    testnet: boolean;
    /** A list of active chains the node is connected to */
    chains: Chain[];
    /** The URIs of the current node. */
    uris: string[];
    /**
     * Features that our node has advertised in our init message, node
     * announcements and invoices.
     */
    features: { [key: number]: Feature };
  }

  
export interface Chain {
    /** The blockchain the node is on (eg bitcoin, litecoin) */
    chain: string;
    /** The network the node is on (eg regtest, testnet, mainnet) */
    network: string;
}
  
export interface ConfirmationUpdate {
    blockSha: Uint8Array;
    blockHeight: number;
    numConfsLeft: number;
  }
  
export interface ChannelOpenUpdate {
    channelPoint: ChannelPoint | undefined;
  }
  
export interface ChannelCloseUpdate {
    closingTxid: Uint8Array;
    success: boolean;
}

export interface CloseChannelRequest {
    /**
     * The outpoint (txid:index) of the funding transaction. With this value, Bob
     * will be able to generate a signature for Alice's version of the commitment
     * transaction.
     */
    channelPoint: ChannelPoint | undefined;
    /**
     * If true, then the channel will be closed forcibly. This means the
     * current commitment transaction will be signed and broadcast.
     */
    force: boolean;
    /**
     * The target number of blocks that the closure transaction should be
     * confirmed by.
     */
    targetConf: number;
    /**
     * Deprecated, use sat_per_vbyte.
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * closure transaction.
     *
     * @deprecated
     */
    satPerByte: number;
    /**
     * An optional address to send funds to in the case of a cooperative close.
     * If the channel was opened with an upfront shutdown script and this field
     * is set, the request to close will fail because the channel must pay out
     * to the upfront shutdown addresss.
     */
    deliveryAddress: string;
    /**
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * closure transaction.
     */
    satPerVbyte: number;
  }
  
  export interface CloseStatusUpdate {
    closePending: PendingUpdate | undefined;
    chanClose: ChannelCloseUpdate | undefined;
  }
  
  export interface PendingUpdate {
    txid: Uint8Array;
    outputIndex: number;
  }
  
  export interface ReadyForPsbtFunding {
    /**
     * The P2WSH address of the channel funding multisig address that the below
     * specified amount in satoshis needs to be sent to.
     */
    fundingAddress: string;
    /**
     * The exact amount in satoshis that needs to be sent to the above address to
     * fund the pending channel.
     */
    fundingAmount: number;
    /**
     * A raw PSBT that contains the pending channel output. If a base PSBT was
     * provided in the PsbtShim, this is the base PSBT with one additional output.
     * If no base PSBT was specified, this is an otherwise empty PSBT with exactly
     * one output.
     */
    psbt: Uint8Array;
  }
  
  export interface BatchOpenChannelRequest {
    /** The list of channels to open. */
    channels: BatchOpenChannel[];
    /**
     * The target number of blocks that the funding transaction should be
     * confirmed by.
     */
    targetConf: number;
    /**
     * A manual fee rate set in sat/vByte that should be used when crafting the
     * funding transaction.
     */
    satPerVbyte: number;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the funding transaction must satisfy.
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the funding
     * transaction.
     */
    spendUnconfirmed: boolean;
    /** An optional label for the batch transaction, limited to 500 characters. */
    label: string;
  }
  
  export interface BatchOpenChannel {
    /**
     * The pubkey of the node to open a channel with. When using REST, this
     * field must be encoded as base64.
     */
    nodePubkey: Uint8Array;
    /** The number of satoshis the wallet should commit to the channel. */
    localFundingAmount: number;
    /**
     * The number of satoshis to push to the remote side as part of the initial
     * commitment state.
     */
    pushSat: number;
    /**
     * Whether this channel should be private, not announced to the greater
     * network.
     */
    private: boolean;
    /**
     * The minimum value in millisatoshi we will require for incoming HTLCs on
     * the channel.
     */
    minHtlcMsat: number;
    /**
     * The delay we require on the remote's commitment transaction. If this is
     * not set, it will be scaled automatically with the channel size.
     */
    remoteCsvDelay: number;
    /**
     * Close address is an optional address which specifies the address to which
     * funds should be paid out to upon cooperative close. This field may only be
     * set if the peer supports the option upfront feature bit (call listpeers
     * to check). The remote peer will only accept cooperative closes to this
     * address if it is set.
     *
     * Note: If this value is set on channel creation, you will *not* be able to
     * cooperatively close out to a different address.
     */
    closeAddress: string;
    /**
     * An optional, unique identifier of 32 random bytes that will be used as the
     * pending channel ID to identify the channel while it is in the pre-pending
     * state.
     */
    pendingChanId: Uint8Array;
    /**
     * The explicit commitment type to use. Note this field will only be used if
     * the remote peer supports explicit channel negotiation.
     */
    commitmentType: CommitmentType;
  }
  
export interface BatchOpenChannelResponse {
    pendingChannels: PendingUpdate[];
}

export interface OpenChannelRequest {
    /**
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * funding transaction.
     */
    satPerVbyte: number;
    /**
     * The pubkey of the node to open a channel with. When using REST, this field
     * must be encoded as base64.
     */
    nodePubkey: Uint8Array;
    /**
     * The hex encoded pubkey of the node to open a channel with. Deprecated now
     * that the REST gateway supports base64 encoding of bytes fields.
     *
     * @deprecated
     */
    nodePubkeyString: string;
    /** The number of satoshis the wallet should commit to the channel */
    localFundingAmount: number;
    /**
     * The number of satoshis to push to the remote side as part of the initial
     * commitment state
     */
    pushSat: number;
    /**
     * The target number of blocks that the funding transaction should be
     * confirmed by.
     */
    targetConf: number;
    /**
     * Deprecated, use sat_per_vbyte.
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * funding transaction.
     *
     * @deprecated
     */
    satPerByte: number;
    /**
     * Whether this channel should be private, not announced to the greater
     * network.
     */
    private: boolean;
    /**
     * The minimum value in millisatoshi we will require for incoming HTLCs on
     * the channel.
     */
    minHtlcMsat: number;
    /**
     * The delay we require on the remote's commitment transaction. If this is
     * not set, it will be scaled automatically with the channel size.
     */
    remoteCsvDelay: number;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the funding transaction must satisfy.
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the funding
     * transaction.
     */
    spendUnconfirmed: boolean;
    /**
     * Close address is an optional address which specifies the address to which
     * funds should be paid out to upon cooperative close. This field may only be
     * set if the peer supports the option upfront feature bit (call listpeers
     * to check). The remote peer will only accept cooperative closes to this
     * address if it is set.
     *
     * Note: If this value is set on channel creation, you will *not* be able to
     * cooperatively close out to a different address.
     */
    closeAddress: string;
    /**
     * Funding shims are an optional argument that allow the caller to intercept
     * certain funding functionality. For example, a shim can be provided to use a
     * particular key for the commitment key (ideally cold) rather than use one
     * that is generated by the wallet as normal, or signal that signing will be
     * carried out in an interactive manner (PSBT based).
     */
    fundingShim: FundingShim | undefined;
    /**
     * The maximum amount of coins in millisatoshi that can be pending within
     * the channel. It only applies to the remote party.
     */
    remoteMaxValueInFlightMsat: number;
    /**
     * The maximum number of concurrent HTLCs we will allow the remote party to add
     * to the commitment transaction.
     */
    remoteMaxHtlcs: number;
    /**
     * Max local csv is the maximum csv delay we will allow for our own commitment
     * transaction.
     */
    maxLocalCsv: number;
    /**
     * The explicit commitment type to use. Note this field will only be used if
     * the remote peer supports explicit channel negotiation.
     */
    commitmentType: CommitmentType;
  }
  
  export interface OpenStatusUpdate {
    /**
     * Signals that the channel is now fully negotiated and the funding
     * transaction published.
     */
    chanPending: PendingUpdate | undefined;
    /**
     * Signals that the channel's funding transaction has now reached the
     * required number of confirmations on chain and can be used.
     */
    chanOpen: ChannelOpenUpdate | undefined;
    /**
     * Signals that the funding process has been suspended and the construction
     * of a PSBT that funds the channel PK script is now required.
     */
    psbtFund: ReadyForPsbtFunding | undefined;
    /**
     * The pending channel ID of the created channel. This value may be used to
     * further the funding flow manually via the FundingStateStep method.
     */
    pendingChanId: Uint8Array;
  }
  
  export interface KeyLocator {
    /** The family of key being identified. */
    keyFamily: number;
    /** The precise index of the key being identified. */
    keyIndex: number;
  }
  
  export interface KeyDescriptor {
    /** The raw bytes of the key being identified. */
    rawKeyBytes: Uint8Array;
    /** The key locator that identifies which key to use for signing. */
    keyLoc: KeyLocator | undefined;
  }
  
  export interface ChanPointShim {
    /**
     * The size of the pre-crafted output to be used as the channel point for this
     * channel funding.
     */
    amt: number;
    /** The target channel point to refrence in created commitment transactions. */
    chanPoint: ChannelPoint | undefined;
    /** Our local key to use when creating the multi-sig output. */
    localKey: KeyDescriptor | undefined;
    /** The key of the remote party to use when creating the multi-sig output. */
    remoteKey: Uint8Array;
    /**
     * If non-zero, then this will be used as the pending channel ID on the wire
     * protocol to initate the funding request. This is an optional field, and
     * should only be set if the responder is already expecting a specific pending
     * channel ID.
     */
    pendingChanId: Uint8Array;
    /**
     * This uint32 indicates if this channel is to be considered 'frozen'. A frozen
     * channel does not allow a cooperative channel close by the initiator. The
     * thaw_height is the height that this restriction stops applying to the
     * channel. The height can be interpreted in two ways: as a relative height if
     * the value is less than 500,000, or as an absolute height otherwise.
     */
    thawHeight: number;
  }
  
  export interface PsbtShim {
    /**
     * A unique identifier of 32 random bytes that will be used as the pending
     * channel ID to identify the PSBT state machine when interacting with it and
     * on the wire protocol to initiate the funding request.
     */
    pendingChanId: Uint8Array;
    /**
     * An optional base PSBT the new channel output will be added to. If this is
     * non-empty, it must be a binary serialized PSBT.
     */
    basePsbt: Uint8Array;
    /**
     * If a channel should be part of a batch (multiple channel openings in one
     * transaction), it can be dangerous if the whole batch transaction is
     * published too early before all channel opening negotiations are completed.
     * This flag prevents this particular channel from broadcasting the transaction
     * after the negotiation with the remote peer. In a batch of channel openings
     * this flag should be set to true for every channel but the very last.
     */
    noPublish: boolean;
  }
  
  export interface FundingShim {
    /**
     * A channel shim where the channel point was fully constructed outside
     * of lnd's wallet and the transaction might already be published.
     */
    chanPointShim: ChanPointShim | undefined;
    /**
     * A channel shim that uses a PSBT to fund and sign the channel funding
     * transaction.
     */
    psbtShim: PsbtShim | undefined;
  }
  
  export interface FundingShimCancel {
    /** The pending channel ID of the channel to cancel the funding shim for. */
    pendingChanId: Uint8Array;
  }
  
  export interface FundingPsbtVerify {
    /**
     * The funded but not yet signed PSBT that sends the exact channel capacity
     * amount to the PK script returned in the open channel message in a previous
     * step.
     */
    fundedPsbt: Uint8Array;
    /** The pending channel ID of the channel to get the PSBT for. */
    pendingChanId: Uint8Array;
    /**
     * Can only be used if the no_publish flag was set to true in the OpenChannel
     * call meaning that the caller is solely responsible for publishing the final
     * funding transaction. If skip_finalize is set to true then lnd will not wait
     * for a FundingPsbtFinalize state step and instead assumes that a transaction
     * with the same TXID as the passed in PSBT will eventually confirm.
     * IT IS ABSOLUTELY IMPERATIVE that the TXID of the transaction that is
     * eventually published does have the _same TXID_ as the verified PSBT. That
     * means no inputs or outputs can change, only signatures can be added. If the
     * TXID changes between this call and the publish step then the channel will
     * never be created and the funds will be in limbo.
     */
    skipFinalize: boolean;
  }
  
  export interface FundingPsbtFinalize {
    /**
     * The funded PSBT that contains all witness data to send the exact channel
     * capacity amount to the PK script returned in the open channel message in a
     * previous step. Cannot be set at the same time as final_raw_tx.
     */
    signedPsbt: Uint8Array;
    /** The pending channel ID of the channel to get the PSBT for. */
    pendingChanId: Uint8Array;
    /**
     * As an alternative to the signed PSBT with all witness data, the final raw
     * wire format transaction can also be specified directly. Cannot be set at the
     * same time as signed_psbt.
     */
    finalRawTx: Uint8Array;
  }
  
export interface FundingTransitionMsg {
    /**
     * The funding shim to register. This should be used before any
     * channel funding has began by the remote party, as it is intended as a
     * preparatory step for the full channel funding.
     */
    shimRegister: FundingShim | undefined;
    /** Used to cancel an existing registered funding shim. */
    shimCancel: FundingShimCancel | undefined;
    /**
     * Used to continue a funding flow that was initiated to be executed
     * through a PSBT. This step verifies that the PSBT contains the correct
     * outputs to fund the channel.
     */
    psbtVerify: FundingPsbtVerify | undefined;
    /**
     * Used to continue a funding flow that was initiated to be executed
     * through a PSBT. This step finalizes the funded and signed PSBT, finishes
     * negotiation with the peer and finally publishes the resulting funding
     * transaction.
     */
    psbtFinalize: FundingPsbtFinalize | undefined;
}
  
export interface FundingStateStepResp {}


export interface PendingHTLC {
    /** The direction within the channel that the htlc was sent */
    incoming: boolean;
    /** The total value of the htlc */
    amount: number;
    /** The final output to be swept back to the user's wallet */
    outpoint: string;
    /** The next block height at which we can spend the current stage */
    maturityHeight: number;
    /**
     * The number of blocks remaining until the current stage can be swept.
     * Negative values indicate how many blocks have passed since becoming
     * mature.
     */
    blocksTilMaturity: number;
    /** Indicates whether the htlc is in its first or second stage of recovery */
    stage: number;
  }
  
export interface PendingChannelsRequest {}
  
export interface PendingChannelsResponse {
    /** The balance in satoshis encumbered in pending channels */
    totalLimboBalance: number;
    /** Channels pending opening */
    pendingOpenChannels: PendingChannelsResponse_PendingOpenChannel[];
    /**
     * Deprecated: Channels pending closing previously contained cooperatively
     * closed channels with a single confirmation. These channels are now
     * considered closed from the time we see them on chain.
     *
     * @deprecated
     */
    pendingClosingChannels: PendingChannelsResponse_ClosedChannel[];
    /** Channels pending force closing */
    pendingForceClosingChannels: PendingChannelsResponse_ForceClosedChannel[];
    /** Channels waiting for closing tx to confirm */
    waitingCloseChannels: PendingChannelsResponse_WaitingCloseChannel[];
}

export interface PendingChannelsResponse_PendingChannel {
    remoteNodePub: string;
    channelPoint: string;
    capacity: number;
    localBalance: number;
    remoteBalance: number;
    /**
     * The minimum satoshis this node is required to reserve in its
     * balance.
     */
    localChanReserveSat: number;
    /**
     * The minimum satoshis the other node is required to reserve in its
     * balance.
     */
    remoteChanReserveSat: number;
    /** The party that initiated opening the channel. */
    initiator: Initiator;
    /** The commitment type used by this channel. */
    commitmentType: CommitmentType;
    /** Total number of forwarding packages created in this channel. */
    numForwardingPackages: number;
  }
  
  export interface PendingChannelsResponse_PendingOpenChannel {
    /** The pending channel */
    channel: PendingChannelsResponse_PendingChannel | undefined;
    /** The height at which this channel will be confirmed */
    confirmationHeight: number;
    /**
     * The amount calculated to be paid in fees for the current set of
     * commitment transactions. The fee amount is persisted with the channel
     * in order to allow the fee amount to be removed and recalculated with
     * each channel state update, including updates that happen after a system
     * restart.
     */
    commitFee: number;
    /** The weight of the commitment transaction */
    commitWeight: number;
    /**
     * The required number of satoshis per kilo-weight that the requester will
     * pay at all times, for both the funding transaction and commitment
     * transaction. This value can later be updated once the channel is open.
     */
    feePerKw: number;
  }
  
export interface PendingChannelsResponse_WaitingCloseChannel {
    /** The pending channel waiting for closing tx to confirm */
    channel: PendingChannelsResponse_PendingChannel | undefined;
    /** The balance in satoshis encumbered in this channel */
    limboBalance: number;
    /**
     * A list of valid commitment transactions. Any of these can confirm at
     * this point.
     */
    commitments: PendingChannelsResponse_Commitments | undefined;
}


export interface PendingChannelsResponse_Commitments {
    /** Hash of the local version of the commitment tx. */
    localTxid: string;
    /** Hash of the remote version of the commitment tx. */
    remoteTxid: string;
    /** Hash of the remote pending version of the commitment tx. */
    remotePendingTxid: string;
    /**
     * The amount in satoshis calculated to be paid in fees for the local
     * commitment.
     */
    localCommitFeeSat: number;
    /**
     * The amount in satoshis calculated to be paid in fees for the remote
     * commitment.
     */
    remoteCommitFeeSat: number;
    /**
     * The amount in satoshis calculated to be paid in fees for the remote
     * pending commitment.
     */
    remotePendingCommitFeeSat: number;
}


export interface PendingChannelsResponse_ClosedChannel {
    /** The pending channel to be closed */
    channel: PendingChannelsResponse_PendingChannel | undefined;
    /** The transaction id of the closing transaction */
    closingTxid: string;
  }
  
export interface PendingChannelsResponse_ForceClosedChannel {
    /** The pending channel to be force closed */
    channel: PendingChannelsResponse_PendingChannel | undefined;
    /** The transaction id of the closing transaction */
    closingTxid: string;
    /** The balance in satoshis encumbered in this pending channel */
    limboBalance: number;
    /** The height at which funds can be swept into the wallet */
    maturityHeight: number;
    /**
     * Remaining # of blocks until the commitment output can be swept.
     * Negative values indicate how many blocks have passed since becoming
     * mature.
     */
    blocksTilMaturity: number;
    /** The total value of funds successfully recovered from this channel */
    recoveredBalance: number;
    pendingHtlcs: PendingHTLC[];
    anchor: PendingChannelsResponse_ForceClosedChannel_AnchorState;
}

export enum PendingChannelsResponse_ForceClosedChannel_AnchorState {
    LIMBO = 0,
    RECOVERED = 1,
    LOST = 2,
    UNRECOGNIZED = -1,
  }

  export interface WalletAccountBalance {
    /** The confirmed balance of the account (with >= 1 confirmations). */
    confirmedBalance: number;
    /** The unconfirmed balance of the account (with 0 confirmations). */
    unconfirmedBalance: number;
  }
  
  export interface WalletBalanceRequest {}
  
  export interface WalletBalanceResponse {
    /** The balance of the wallet */
    totalBalance: number;
    /** The confirmed balance of a wallet(with >= 1 confirmations) */
    confirmedBalance: number;
    /** The unconfirmed balance of a wallet(with 0 confirmations) */
    unconfirmedBalance: number;
    /** A mapping of each wallet account's name to its balance. */
    accountBalance: { [key: string]: WalletAccountBalance };
}

export interface Amount {
    /** Value denominated in satoshis. */
    sat: number;
    /** Value denominated in milli-satoshis. */
    msat: number;
  }
  
export interface ChannelBalanceRequest {}
  
export interface ChannelBalanceResponse {
    /**
     * Deprecated. Sum of channels balances denominated in satoshis
     *
     * @deprecated
     */
    balance: number;
    /**
     * Deprecated. Sum of channels pending balances denominated in satoshis
     *
     * @deprecated
     */
    pendingOpenBalance: number;
    /** Sum of channels local balances. */
    localBalance: Amount | undefined;
    /** Sum of channels remote balances. */
    remoteBalance: Amount | undefined;
    /** Sum of channels local unsettled balances. */
    unsettledLocalBalance: Amount | undefined;
    /** Sum of channels remote unsettled balances. */
    unsettledRemoteBalance: Amount | undefined;
    /** Sum of channels pending local balances. */
    pendingOpenLocalBalance: Amount | undefined;
    /** Sum of channels pending remote balances. */
    pendingOpenRemoteBalance: Amount | undefined;
}


export interface QueryRoutesRequest {
    /** The 33-byte hex-encoded public key for the payment destination */
    pubKey: string;
    /**
     * The amount to send expressed in satoshis.
     *
     * The fields amt and amt_msat are mutually exclusive.
     */
    amt: number;
    /**
     * The amount to send expressed in millisatoshis.
     *
     * The fields amt and amt_msat are mutually exclusive.
     */
    amtMsat: number;
    /**
     * An optional CLTV delta from the current height that should be used for the
     * timelock of the final hop. Note that unlike SendPayment, QueryRoutes does
     * not add any additional block padding on top of final_ctlv_delta. This
     * padding of a few blocks needs to be added manually or otherwise failures may
     * happen when a block comes in while the payment is in flight.
     */
    finalCltvDelta: number;
    /**
     * The maximum number of satoshis that will be paid as a fee of the payment.
     * This value can be represented either as a percentage of the amount being
     * sent, or as a fixed amount of the maximum fee the user is willing the pay to
     * send the payment.
     */
    feeLimit: FeeLimit | undefined;
    /**
     * A list of nodes to ignore during path finding. When using REST, these fields
     * must be encoded as base64.
     */
    ignoredNodes: Uint8Array[];
    /**
     * Deprecated. A list of edges to ignore during path finding.
     *
     * @deprecated
     */
    ignoredEdges: EdgeLocator[];
    /**
     * The source node where the request route should originated from. If empty,
     * self is assumed.
     */
    sourcePubKey: string;
    /**
     * If set to true, edge probabilities from mission control will be used to get
     * the optimal route.
     */
    useMissionControl: boolean;
    /** A list of directed node pairs that will be ignored during path finding. */
    ignoredPairs: NodePair[];
    /**
     * An optional maximum total time lock for the route. If the source is empty or
     * ourselves, this should not exceed lnd's `--max-cltv-expiry` setting. If
     * zero, then the value of `--max-cltv-expiry` is used as the limit.
     */
    cltvLimit: number;
    /**
     * An optional field that can be used to pass an arbitrary set of TLV records
     * to a peer which understands the new records. This can be used to pass
     * application specific data during the payment attempt. If the destination
     * does not support the specified records, an error will be returned.
     * Record types are required to be in the custom range >= 65536. When using
     * REST, the values must be encoded as base64.
     */
    destCustomRecords: { [key: number]: Uint8Array };
    /**
     * The channel id of the channel that must be taken to the first hop. If zero,
     * any channel may be used.
     */
    outgoingChanId: number;
    /** The pubkey of the last hop of the route. If empty, any hop may be used. */
    lastHopPubkey: Uint8Array;
    /** Optional route hints to reach the destination through private channels. */
    routeHints: RouteHint[];
    /**
     * Features assumed to be supported by the final node. All transitive feature
     * dependencies must also be set properly. For a given feature bit pair, either
     * optional or remote may be set, but not both. If this field is nil or empty,
     * the router will try to load destination features from the graph as a
     * fallback.
     */
    destFeatures: FeatureBit[];
}

export interface NodePair {
    /**
     * The sending node of the pair. When using REST, this field must be encoded as
     * base64.
     */
    from: Uint8Array;
    /**
     * The receiving node of the pair. When using REST, this field must be encoded
     * as base64.
     */
    to: Uint8Array;
  }
  
  export interface EdgeLocator {
    /** The short channel id of this edge. */
    channelId: number;
    /**
     * The direction of this edge. If direction_reverse is false, the direction
     * of this edge is from the channel endpoint with the lexicographically smaller
     * pub key to the endpoint with the larger pub key. If direction_reverse is
     * is true, the edge goes the other way.
     */
    directionReverse: boolean;
  }
  
  export interface QueryRoutesResponse {
    /**
     * The route that results from the path finding operation. This is still a
     * repeated field to retain backwards compatibility.
     */
    routes: Route[];
    /**
     * The success probability of the returned route based on the current mission
     * control state. [EXPERIMENTAL]
     */
    successProb: number;
  }
  
  export interface Hop {
    /**
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     */
    chanId: number;
    /** @deprecated */
    chanCapacity: number;
    /** @deprecated */
    amtToForward: number;
    /** @deprecated */
    fee: number;
    expiry: number;
    amtToForwardMsat: number;
    feeMsat: number;
    /**
     * An optional public key of the hop. If the public key is given, the payment
     * can be executed without relying on a copy of the channel graph.
     */
    pubKey: string;
    /**
     * If set to true, then this hop will be encoded using the new variable length
     * TLV format. Note that if any custom tlv_records below are specified, then
     * this field MUST be set to true for them to be encoded properly.
     */
    tlvPayload: boolean;
    /**
     * An optional TLV record that signals the use of an MPP payment. If present,
     * the receiver will enforce that the same mpp_record is included in the final
     * hop payload of all non-zero payments in the HTLC set. If empty, a regular
     * single-shot payment is or was attempted.
     */
    mppRecord: MPPRecord | undefined;
    /**
     * An optional TLV record that signals the use of an AMP payment. If present,
     * the receiver will treat all received payments including the same
     * (payment_addr, set_id) pair  as being part of one logical payment. The
     * payment will be settled by XORing the root_share's together and deriving the
     * child hashes and preimages according to BOLT XX. Must be used in conjunction
     * with mpp_record.
     */
    ampRecord: AMPRecord | undefined;
    /**
     * An optional set of key-value TLV records. This is useful within the context
     * of the SendToRoute call as it allows callers to specify arbitrary K-V pairs
     * to drop off at each hop within the onion.
     */
    customRecords: { [key: number]: Uint8Array };
}

export interface MPPRecord {
    /**
     * A unique, random identifier used to authenticate the sender as the intended
     * payer of a multi-path payment. The payment_addr must be the same for all
     * subpayments, and match the payment_addr provided in the receiver's invoice.
     * The same payment_addr must be used on all subpayments.
     */
    paymentAddr: Uint8Array;
    /**
     * The total amount in milli-satoshis being sent as part of a larger multi-path
     * payment. The caller is responsible for ensuring subpayments to the same node
     * and payment_hash sum exactly to total_amt_msat. The same
     * total_amt_msat must be used on all subpayments.
     */
    totalAmtMsat: number;
  }
  
  export interface AMPRecord {
    rootShare: Uint8Array;
    setId: Uint8Array;
    childIndex: number;
  }
  
  /**
   * A path through the channel graph which runs over one or more channels in
   * succession. This struct carries all the information required to craft the
   * Sphinx onion packet, and send the payment along the first hop in the path. A
   * route is only selected as valid if all the channels have sufficient capacity to
   * carry the initial payment amount after fees are accounted for.
   */
  export interface Route {
    /**
     * The cumulative (final) time lock across the entire route. This is the CLTV
     * value that should be extended to the first hop in the route. All other hops
     * will decrement the time-lock as advertised, leaving enough time for all
     * hops to wait for or present the payment preimage to complete the payment.
     */
    totalTimeLock: number;
    /**
     * The sum of the fees paid at each hop within the final route. In the case
     * of a one-hop payment, this value will be zero as we don't need to pay a fee
     * to ourselves.
     *
     * @deprecated
     */
    totalFees: number;
    /**
     * The total amount of funds required to complete a payment over this route.
     * This value includes the cumulative fees at each hop. As a result, the HTLC
     * extended to the first-hop in the route will need to have at least this many
     * satoshis, otherwise the route will fail at an intermediate node due to an
     * insufficient amount of fees.
     *
     * @deprecated
     */
    totalAmt: number;
    /** Contains details concerning the specific forwarding details at each hop. */
    hops: Hop[];
    /** The total fees in millisatoshis. */
    totalFeesMsat: number;
    /** The total amount in millisatoshis. */
    totalAmtMsat: number;
  }
  
  export interface NodeInfoRequest {
    /** The 33-byte hex-encoded compressed public of the target node */
    pubKey: string;
    /** If true, will include all known channels associated with the node. */
    includeChannels: boolean;
  }
  
  export interface NodeInfo {
    /**
     * An individual vertex/node within the channel graph. A node is
     * connected to other nodes by one or more channel edges emanating from it. As
     * the graph is directed, a node will also have an incoming edge attached to
     * it for each outgoing edge.
     */
    node: LightningNode | undefined;
    /** The total number of channels for the node. */
    numChannels: number;
    /** The sum of all channels capacity for the node, denominated in satoshis. */
    totalCapacity: number;
    /** A list of all public channels for the node. */
    channels: ChannelEdge[];
  }
  
  /**
   * An individual vertex/node within the channel graph. A node is
   * connected to other nodes by one or more channel edges emanating from it. As the
   * graph is directed, a node will also have an incoming edge attached to it for
   * each outgoing edge.
   */
  export interface LightningNode {
    lastUpdate: number;
    pubKey: string;
    alias: string;
    addresses: NodeAddress[];
    color: string;
    features: { [key: number]: Feature };
  }

  export interface NodeAddress {
    network: string;
    addr: string;
  }
  
  export interface RoutingPolicy {
    timeLockDelta: number;
    minHtlc: number;
    feeBaseMsat: number;
    feeRateMilliMsat: number;
    disabled: boolean;
    maxHtlcMsat: number;
    lastUpdate: number;
  }
  
  /**
   * A fully authenticated channel along with all its unique attributes.
   * Once an authenticated channel announcement has been processed on the network,
   * then an instance of ChannelEdgeInfo encapsulating the channels attributes is
   * stored. The other portions relevant to routing policy of a channel are stored
   * within a ChannelEdgePolicy for each direction of the channel.
   */
  export interface ChannelEdge {
    /**
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     */
    channelId: number;
    chanPoint: string;
    /** @deprecated */
    lastUpdate: number;
    node1Pub: string;
    node2Pub: string;
    capacity: number;
    node1Policy: RoutingPolicy | undefined;
    node2Policy: RoutingPolicy | undefined;
  }
  
  export interface ChannelGraphRequest {
    /**
     * Whether unannounced channels are included in the response or not. If set,
     * unannounced channels are included. Unannounced channels are both private
     * channels, and public channels that are not yet announced to the network.
     */
    includeUnannounced: boolean;
  }
  
  /** Returns a new instance of the directed channel graph. */
  export interface ChannelGraph {
    /** The list of `LightningNode`s in this channel graph */
    nodes: LightningNode[];
    /** The list of `ChannelEdge`s in this channel graph */
    edges: ChannelEdge[];
  }
  
  export interface NodeMetricsRequest {
    /** The requested node metrics. */
    types: NodeMetricType[];
  }
  
  export interface NodeMetricsResponse {
    /**
     * Betweenness centrality is the sum of the ratio of shortest paths that pass
     * through the node for each pair of nodes in the graph (not counting paths
     * starting or ending at this node).
     * Map of node pubkey to betweenness centrality of the node. Normalized
     * values are in the [0,1] closed interval.
     */
    betweennessCentrality: { [key: string]: FloatMetric };
  }


  export interface FloatMetric {
    /** Arbitrary float value. */
    value: number;
    /** The value normalized to [0,1] or [-1,1]. */
    normalizedValue: number;
  }
  
  export interface ChanInfoRequest {
    /**
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     */
    chanId: number;
  }
  
  export interface NetworkInfoRequest {}
  
  export interface NetworkInfo {
    graphDiameter: number;
    avgOutDegree: number;
    maxOutDegree: number;
    numNodes: number;
    numChannels: number;
    totalNetworkCapacity: number;
    avgChannelSize: number;
    minChannelSize: number;
    maxChannelSize: number;
    medianChannelSizeSat: number;
    /** The number of edges marked as zombies. */
    numZombieChans: number;
  }
  
  export interface StopRequest {}
  
  export interface StopResponse {}
  
  export interface GraphTopologySubscription {}
  
  export interface GraphTopologyUpdate {
    nodeUpdates: NodeUpdate[];
    channelUpdates: ChannelEdgeUpdate[];
    closedChans: ClosedChannelUpdate[];
  }
  
  export interface NodeUpdate {
    /**
     * Deprecated, use node_addresses.
     *
     * @deprecated
     */
    addresses: string[];
    identityKey: string;
    /**
     * Deprecated, use features.
     *
     * @deprecated
     */
    globalFeatures: Uint8Array;
    alias: string;
    color: string;
    nodeAddresses: NodeAddress[];
    /**
     * Features that the node has advertised in the init message, node
     * announcements and invoices.
     */
    features: { [key: number]: Feature };
  }
  
export interface ChannelEdgeUpdate {
    /**
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     */
    chanId: number;
    chanPoint: ChannelPoint | undefined;
    capacity: number;
    routingPolicy: RoutingPolicy | undefined;
    advertisingNode: string;
    connectingNode: string;
  }
  
  export interface ClosedChannelUpdate {
    /**
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     */
    chanId: number;
    capacity: number;
    closedHeight: number;
    chanPoint: ChannelPoint | undefined;
  }
  
  export interface HopHint {
    /** The public key of the node at the start of the channel. */
    nodeId: string;
    /** The unique identifier of the channel. */
    chanId: number;
    /** The base fee of the channel denominated in millisatoshis. */
    feeBaseMsat: number;
    /**
     * The fee rate of the channel for sending one satoshi across it denominated in
     * millionths of a satoshi.
     */
    feeProportionalMillionths: number;
    /** The time-lock delta of the channel. */
    cltvExpiryDelta: number;
  }
  
  export interface SetID {
    setId: Uint8Array;
  }
  
  export interface RouteHint {
    /**
     * A list of hop hints that when chained together can assist in reaching a
     * specific destination.
     */
    hopHints: HopHint[];
  }
  
  export interface AMPInvoiceState {
    /** The state the HTLCs associated with this setID are in. */
    state: InvoiceHTLCState;
    /** The settle index of this HTLC set, if the invoice state is settled. */
    settleIndex: number;
    /** The time this HTLC set was settled expressed in unix epoch. */
    settleTime: number;
    /** The total amount paid for the sub-invoice expressed in milli satoshis. */
    amtPaidMsat: number;
  }
  
  export interface Invoice {
    /**
     * An optional memo to attach along with the invoice. Used for record keeping
     * purposes for the invoice's creator, and will also be set in the description
     * field of the encoded payment request if the description_hash field is not
     * being used.
     */
    memo: string;
    /**
     * The hex-encoded preimage (32 byte) which will allow settling an incoming
     * HTLC payable to this preimage. When using REST, this field must be encoded
     * as base64.
     */
    rPreimage: Uint8Array;
    /**
     * The hash of the preimage. When using REST, this field must be encoded as
     * base64.
     */
    rHash: Uint8Array;
    /**
     * The value of this invoice in satoshis
     *
     * The fields value and value_msat are mutually exclusive.
     */
    value: number;
    /**
     * The value of this invoice in millisatoshis
     *
     * The fields value and value_msat are mutually exclusive.
     */
    valueMsat: number;
    /**
     * Whether this invoice has been fulfilled
     *
     * @deprecated
     */
    settled: boolean;
    /** When this invoice was created */
    creationDate: number;
    /** When this invoice was settled */
    settleDate: number;
    /**
     * A bare-bones invoice for a payment within the Lightning Network. With the
     * details of the invoice, the sender has all the data necessary to send a
     * payment to the recipient.
     */
    paymentRequest: string;
    /**
     * Hash (SHA-256) of a description of the payment. Used if the description of
     * payment (memo) is too long to naturally fit within the description field
     * of an encoded payment request. When using REST, this field must be encoded
     * as base64.
     */
    descriptionHash: Uint8Array;
    /** Payment request expiry time in seconds. Default is 3600 (1 hour). */
    expiry: number;
    /** Fallback on-chain address. */
    fallbackAddr: string;
    /** Delta to use for the time-lock of the CLTV extended to the final hop. */
    cltvExpiry: number;
    /**
     * Route hints that can each be individually used to assist in reaching the
     * invoice's destination.
     */
    routeHints: RouteHint[];
    /** Whether this invoice should include routing hints for private channels. */
    private: boolean;
    /**
     * The "add" index of this invoice. Each newly created invoice will increment
     * this index making it monotonically increasing. Callers to the
     * SubscribeInvoices call can use this to instantly get notified of all added
     * invoices with an add_index greater than this one.
     */
    addIndex: number;
    /**
     * The "settle" index of this invoice. Each newly settled invoice will
     * increment this index making it monotonically increasing. Callers to the
     * SubscribeInvoices call can use this to instantly get notified of all
     * settled invoices with an settle_index greater than this one.
     */
    settleIndex: number;
    /**
     * Deprecated, use amt_paid_sat or amt_paid_msat.
     *
     * @deprecated
     */
    amtPaid: number;
    /**
     * The amount that was accepted for this invoice, in satoshis. This will ONLY
     * be set if this invoice has been settled. We provide this field as if the
     * invoice was created with a zero value, then we need to record what amount
     * was ultimately accepted. Additionally, it's possible that the sender paid
     * MORE that was specified in the original invoice. So we'll record that here
     * as well.
     */
    amtPaidSat: number;
    /**
     * The amount that was accepted for this invoice, in millisatoshis. This will
     * ONLY be set if this invoice has been settled. We provide this field as if
     * the invoice was created with a zero value, then we need to record what
     * amount was ultimately accepted. Additionally, it's possible that the sender
     * paid MORE that was specified in the original invoice. So we'll record that
     * here as well.
     */
    amtPaidMsat: number;
    /** The state the invoice is in. */
    state: Invoice_InvoiceState;
    /** List of HTLCs paying to this invoice [EXPERIMENTAL]. */
    htlcs: InvoiceHTLC[];
    /** List of features advertised on the invoice. */
    features: { [key: number]: Feature };
    /**
     * Indicates if this invoice was a spontaneous payment that arrived via keysend
     * [EXPERIMENTAL].
     */
    isKeysend: boolean;
    /**
     * The payment address of this invoice. This value will be used in MPP
     * payments, and also for newer invoices that always require the MPP payload
     * for added end-to-end security.
     */
    paymentAddr: Uint8Array;
    /** Signals whether or not this is an AMP invoice. */
    isAmp: boolean;
    /**
     * [EXPERIMENTAL]:
     *
     * Maps a 32-byte hex-encoded set ID to the sub-invoice AMP state for the
     * given set ID. This field is always populated for AMP invoices, and can be
     * used along side LookupInvoice to obtain the HTLC information related to a
     * given sub-invoice.
     */
    ampInvoiceState: { [key: string]: AMPInvoiceState };
  }
  
  export enum Invoice_InvoiceState {
    OPEN = 0,
    SETTLED = 1,
    CANCELED = 2,
    ACCEPTED = 3,
    UNRECOGNIZED = -1,
  }

/** Details of an HTLC that paid to an invoice */
export interface InvoiceHTLC {
    /** Short channel id over which the htlc was received. */
    chanId: number;
    /** Index identifying the htlc on the channel. */
    htlcIndex: number;
    /** The amount of the htlc in msat. */
    amtMsat: number;
    /** Block height at which this htlc was accepted. */
    acceptHeight: number;
    /** Time at which this htlc was accepted. */
    acceptTime: number;
    /** Time at which this htlc was settled or canceled. */
    resolveTime: number;
    /** Block height at which this htlc expires. */
    expiryHeight: number;
    /** Current state the htlc is in. */
    state: InvoiceHTLCState;
    /** Custom tlv records. */
    customRecords: { [key: number]: Uint8Array };
    /** The total amount of the mpp payment in msat. */
    mppTotalAmtMsat: number;
    /** Details relevant to AMP HTLCs, only populated if this is an AMP HTLC. */
    amp: AMP | undefined;
  }
  
  export interface InvoiceHTLC_CustomRecordsEntry {
    key: number;
    value: Uint8Array;
  }
  
  /** Details specific to AMP HTLCs. */
  export interface AMP {
    /**
     * An n-of-n secret share of the root seed from which child payment hashes
     * and preimages are derived.
     */
    rootShare: Uint8Array;
    /** An identifier for the HTLC set that this HTLC belongs to. */
    setId: Uint8Array;
    /**
     * A nonce used to randomize the child preimage and child hash from a given
     * root_share.
     */
    childIndex: number;
    /** The payment hash of the AMP HTLC. */
    hash: Uint8Array;
    /**
     * The preimage used to settle this AMP htlc. This field will only be
     * populated if the invoice is in InvoiceState_ACCEPTED or
     * InvoiceState_SETTLED.
     */
    preimage: Uint8Array;
  }
  
  export interface AddInvoiceResponse {
    rHash: Uint8Array;
    /**
     * A bare-bones invoice for a payment within the Lightning Network. With the
     * details of the invoice, the sender has all the data necessary to send a
     * payment to the recipient.
     */
    paymentRequest: string;
    /**
     * The "add" index of this invoice. Each newly created invoice will increment
     * this index making it monotonically increasing. Callers to the
     * SubscribeInvoices call can use this to instantly get notified of all added
     * invoices with an add_index greater than this one.
     */
    addIndex: number;
    /**
     * The payment address of the generated invoice. This value should be used
     * in all payments for this invoice as we require it for end to end
     * security.
     */
    paymentAddr: Uint8Array;
  }
  
  export interface PaymentHash {
    /**
     * The hex-encoded payment hash of the invoice to be looked up. The passed
     * payment hash must be exactly 32 bytes, otherwise an error is returned.
     * Deprecated now that the REST gateway supports base64 encoding of bytes
     * fields.
     *
     * @deprecated
     */
    rHashStr: string;
    /**
     * The payment hash of the invoice to be looked up. When using REST, this field
     * must be encoded as base64.
     */
    rHash: Uint8Array;
  }
  
  export interface ListInvoiceRequest {
    /**
     * If set, only invoices that are not settled and not canceled will be returned
     * in the response.
     */
    pendingOnly: boolean;
    /**
     * The index of an invoice that will be used as either the start or end of a
     * query to determine which invoices should be returned in the response.
     */
    indexOffset: number;
    /** The max number of invoices to return in the response to this query. */
    numMaxInvoices: number;
    /**
     * If set, the invoices returned will result from seeking backwards from the
     * specified index offset. This can be used to paginate backwards.
     */
    reversed: boolean;
  }
  
  export interface ListInvoiceResponse {
    /**
     * A list of invoices from the time slice of the time series specified in the
     * request.
     */
    invoices: Invoice[];
    /**
     * The index of the last item in the set of returned invoices. This can be used
     * to seek further, pagination style.
     */
    lastIndexOffset: number;
    /**
     * The index of the last item in the set of returned invoices. This can be used
     * to seek backwards, pagination style.
     */
    firstIndexOffset: number;
  }
  
  export interface InvoiceSubscription {
    /**
     * If specified (non-zero), then we'll first start by sending out
     * notifications for all added indexes with an add_index greater than this
     * value. This allows callers to catch up on any events they missed while they
     * weren't connected to the streaming RPC.
     */
    addIndex: number;
    /**
     * If specified (non-zero), then we'll first start by sending out
     * notifications for all settled indexes with an settle_index greater than
     * this value. This allows callers to catch up on any events they missed while
     * they weren't connected to the streaming RPC.
     */
    settleIndex: number;
  }
  
  export interface Payment {
    /** The payment hash */
    paymentHash: string;
    /**
     * Deprecated, use value_sat or value_msat.
     *
     * @deprecated
     */
    value: number;
    /**
     * Deprecated, use creation_time_ns
     *
     * @deprecated
     */
    creationDate: number;
    /**
     * Deprecated, use fee_sat or fee_msat.
     *
     * @deprecated
     */
    fee: number;
    /** The payment preimage */
    paymentPreimage: string;
    /** The value of the payment in satoshis */
    valueSat: number;
    /** The value of the payment in milli-satoshis */
    valueMsat: number;
    /** The optional payment request being fulfilled. */
    paymentRequest: string;
    /** The status of the payment. */
    status: Payment_PaymentStatus;
    /** The fee paid for this payment in satoshis */
    feeSat: number;
    /** The fee paid for this payment in milli-satoshis */
    feeMsat: number;
    /** The time in UNIX nanoseconds at which the payment was created. */
    creationTimeNs: number;
    /** The HTLCs made in attempt to settle the payment. */
    htlcs: HTLCAttempt[];
    /**
     * The creation index of this payment. Each payment can be uniquely identified
     * by this index, which may not strictly increment by 1 for payments made in
     * older versions of lnd.
     */
    paymentIndex: number;
    failureReason: PaymentFailureReason;
  }
  
  export enum Payment_PaymentStatus {
    UNKNOWN = 0,
    IN_FLIGHT = 1,
    SUCCEEDED = 2,
    FAILED = 3,
    UNRECOGNIZED = -1,
  }

  export interface HTLCAttempt {
    /** The unique ID that is used for this attempt. */
    attemptId: number;
    /** The status of the HTLC. */
    status: HTLCAttempt_HTLCStatus;
    /** The route taken by this HTLC. */
    route: Route | undefined;
    /** The time in UNIX nanoseconds at which this HTLC was sent. */
    attemptTimeNs: number;
    /**
     * The time in UNIX nanoseconds at which this HTLC was settled or failed.
     * This value will not be set if the HTLC is still IN_FLIGHT.
     */
    resolveTimeNs: number;
    /** Detailed htlc failure info. */
    failure: Failure | undefined;
    /** The preimage that was used to settle the HTLC. */
    preimage: Uint8Array;
  }

  export enum HTLCAttempt_HTLCStatus {
    IN_FLIGHT = 0,
    SUCCEEDED = 1,
    FAILED = 2,
    UNRECOGNIZED = -1,
  }


  export interface ListPaymentsRequest {
    /**
     * If true, then return payments that have not yet fully completed. This means
     * that pending payments, as well as failed payments will show up if this
     * field is set to true. This flag doesn't change the meaning of the indices,
     * which are tied to individual payments.
     */
    includeIncomplete: boolean;
    /**
     * The index of a payment that will be used as either the start or end of a
     * query to determine which payments should be returned in the response. The
     * index_offset is exclusive. In the case of a zero index_offset, the query
     * will start with the oldest payment when paginating forwards, or will end
     * with the most recent payment when paginating backwards.
     */
    indexOffset: number;
    /** The maximal number of payments returned in the response to this query. */
    maxPayments: number;
    /**
     * If set, the payments returned will result from seeking backwards from the
     * specified index offset. This can be used to paginate backwards. The order
     * of the returned payments is always oldest first (ascending index order).
     */
    reversed: boolean;
  }
  
  export interface ListPaymentsResponse {
    /** The list of payments */
    payments: Payment[];
    /**
     * The index of the first item in the set of returned payments. This can be
     * used as the index_offset to continue seeking backwards in the next request.
     */
    firstIndexOffset: number;
    /**
     * The index of the last item in the set of returned payments. This can be used
     * as the index_offset to continue seeking forwards in the next request.
     */
    lastIndexOffset: number;
  }
  
  export interface DeletePaymentRequest {
    /** Payment hash to delete. */
    paymentHash: Uint8Array;
    /** Only delete failed HTLCs from the payment, not the payment itself. */
    failedHtlcsOnly: boolean;
  }
  
  export interface DeleteAllPaymentsRequest {
    /** Only delete failed payments. */
    failedPaymentsOnly: boolean;
    /** Only delete failed HTLCs from payments, not the payment itself. */
    failedHtlcsOnly: boolean;
  }
  
  export interface DeletePaymentResponse {}
  
  export interface DeleteAllPaymentsResponse {}
  
  export interface AbandonChannelRequest {
    channelPoint: ChannelPoint | undefined;
    pendingFundingShimOnly: boolean;
    /**
     * Override the requirement for being in dev mode by setting this to true and
     * confirming the user knows what they are doing and this is a potential foot
     * gun to lose funds if used on active channels.
     */
    iKnowWhatIAmDoing: boolean;
  }
  
  export interface AbandonChannelResponse {}
  
  export interface DebugLevelRequest {
    show: boolean;
    levelSpec: string;
  }
  
  export interface DebugLevelResponse {
    subSystems: string;
  }
  
  export interface PayReqString {
    /** The payment request string to be decoded */
    payReq: string;
  }
  
  export interface PayReq {
    destination: string;
    paymentHash: string;
    numSatoshis: number;
    timestamp: number;
    expiry: number;
    description: string;
    descriptionHash: string;
    fallbackAddr: string;
    cltvExpiry: number;
    routeHints: RouteHint[];
    paymentAddr: Uint8Array;
    numMsat: number;
    features: { [key: number]: Feature };
  }
  
  export interface PayReq_FeaturesEntry {
    key: number;
    value: Feature | undefined;
  }
  
  export interface Feature {
    name: string;
    isRequired: boolean;
    isKnown: boolean;
  }

  export interface FeeReportRequest {}

  export interface ChannelFeeReport {
    /** The short channel id that this fee report belongs to. */
    chanId: number;
    /** The channel that this fee report belongs to. */
    channelPoint: string;
    /** The base fee charged regardless of the number of milli-satoshis sent. */
    baseFeeMsat: number;
    /**
     * The amount charged per milli-satoshis transferred expressed in
     * millionths of a satoshi.
     */
    feePerMil: number;
    /**
     * The effective fee rate in milli-satoshis. Computed by dividing the
     * fee_per_mil value by 1 million.
     */
    feeRate: number;
  }
  
  export interface FeeReportResponse {
    /**
     * An array of channel fee reports which describes the current fee schedule
     * for each channel.
     */
    channelFees: ChannelFeeReport[];
    /**
     * The total amount of fee revenue (in satoshis) the switch has collected
     * over the past 24 hrs.
     */
    dayFeeSum: number;
    /**
     * The total amount of fee revenue (in satoshis) the switch has collected
     * over the past 1 week.
     */
    weekFeeSum: number;
    /**
     * The total amount of fee revenue (in satoshis) the switch has collected
     * over the past 1 month.
     */
    monthFeeSum: number;
  }
  
  export interface PolicyUpdateRequest {
    /** If set, then this update applies to all currently active channels. */
    global: boolean | undefined;
    /** If set, this update will target a specific channel. */
    chanPoint: ChannelPoint | undefined;
    /** The base fee charged regardless of the number of milli-satoshis sent. */
    baseFeeMsat: number;
    /**
     * The effective fee rate in milli-satoshis. The precision of this value
     * goes up to 6 decimal places, so 1e-6.
     */
    feeRate: number;
    /** The required timelock delta for HTLCs forwarded over the channel. */
    timeLockDelta: number;
    /**
     * If set, the maximum HTLC size in milli-satoshis. If unset, the maximum
     * HTLC will be unchanged.
     */
    maxHtlcMsat: number;
    /**
     * The minimum HTLC size in milli-satoshis. Only applied if
     * min_htlc_msat_specified is true.
     */
    minHtlcMsat: number;
    /** If true, min_htlc_msat is applied. */
    minHtlcMsatSpecified: boolean;
  }
  
  export interface FailedUpdate {
    /** The outpoint in format txid:n */
    outpoint: OutPoint | undefined;
    /** Reason for the policy update failure. */
    reason: UpdateFailure;
    /** A string representation of the policy update error. */
    updateError: string;
  }
  
  export interface PolicyUpdateResponse {
    /** List of failed policy updates. */
    failedUpdates: FailedUpdate[];
  }
  
  export interface ForwardingHistoryRequest {
    /**
     * Start time is the starting point of the forwarding history request. All
     * records beyond this point will be included, respecting the end time, and
     * the index offset.
     */
    startTime: number;
    /**
     * End time is the end point of the forwarding history request. The
     * response will carry at most 50k records between the start time and the
     * end time. The index offset can be used to implement pagination.
     */
    endTime: number;
    /**
     * Index offset is the offset in the time series to start at. As each
     * response can only contain 50k records, callers can use this to skip
     * around within a packed time series.
     */
    indexOffset: number;
    /** The max number of events to return in the response to this query. */
    numMaxEvents: number;
  }
  
  export interface ForwardingEvent {
    /**
     * Timestamp is the time (unix epoch offset) that this circuit was
     * completed. Deprecated by timestamp_ns.
     *
     * @deprecated
     */
    timestamp: number;
    /** The incoming channel ID that carried the HTLC that created the circuit. */
    chanIdIn: number;
    /**
     * The outgoing channel ID that carried the preimage that completed the
     * circuit.
     */
    chanIdOut: number;
    /**
     * The total amount (in satoshis) of the incoming HTLC that created half
     * the circuit.
     */
    amtIn: number;
    /**
     * The total amount (in satoshis) of the outgoing HTLC that created the
     * second half of the circuit.
     */
    amtOut: number;
    /** The total fee (in satoshis) that this payment circuit carried. */
    fee: number;
    /** The total fee (in milli-satoshis) that this payment circuit carried. */
    feeMsat: number;
    /**
     * The total amount (in milli-satoshis) of the incoming HTLC that created
     * half the circuit.
     */
    amtInMsat: number;
    /**
     * The total amount (in milli-satoshis) of the outgoing HTLC that created
     * the second half of the circuit.
     */
    amtOutMsat: number;
    /**
     * The number of nanoseconds elapsed since January 1, 1970 UTC when this
     * circuit was completed.
     */
    timestampNs: number;
  }
  
  export interface ForwardingHistoryResponse {
    /**
     * A list of forwarding events from the time slice of the time series
     * specified in the request.
     */
    forwardingEvents: ForwardingEvent[];
    /**
     * The index of the last time in the set of returned forwarding events. Can
     * be used to seek further, pagination style.
     */
    lastOffsetIndex: number;
  }
  
  export interface ExportChannelBackupRequest {
    /** The target channel point to obtain a back up for. */
    chanPoint: ChannelPoint | undefined;
  }
  
  export interface ChannelBackup {
    /** Identifies the channel that this backup belongs to. */
    chanPoint: ChannelPoint | undefined;
    /**
     * Is an encrypted single-chan backup. this can be passed to
     * RestoreChannelBackups, or the WalletUnlocker Init and Unlock methods in
     * order to trigger the recovery protocol. When using REST, this field must be
     * encoded as base64.
     */
    chanBackup: Uint8Array;
  }
  
  export interface MultiChanBackup {
    /** Is the set of all channels that are included in this multi-channel backup. */
    chanPoints: ChannelPoint[];
    /**
     * A single encrypted blob containing all the static channel backups of the
     * channel listed above. This can be stored as a single file or blob, and
     * safely be replaced with any prior/future versions. When using REST, this
     * field must be encoded as base64.
     */
    multiChanBackup: Uint8Array;
  }
  
  export interface ChanBackupExportRequest {}
  
  export interface ChanBackupSnapshot {
    /**
     * The set of new channels that have been added since the last channel backup
     * snapshot was requested.
     */
    singleChanBackups: ChannelBackups | undefined;
    /**
     * A multi-channel backup that covers all open channels currently known to
     * lnd.
     */
    multiChanBackup: MultiChanBackup | undefined;
  }
  
  export interface ChannelBackups {
    /** A set of single-chan static channel backups. */
    chanBackups: ChannelBackup[];
  }
  
  export interface RestoreChanBackupRequest {
    /** The channels to restore as a list of channel/backup pairs. */
    chanBackups: ChannelBackups | undefined;
    /**
     * The channels to restore in the packed multi backup format. When using
     * REST, this field must be encoded as base64.
     */
    multiChanBackup: Uint8Array | undefined;
  }
  
  export interface RestoreBackupResponse {}
  
  export interface ChannelBackupSubscription {}
  
  export interface VerifyChanBackupResponse {}
  
  export interface MacaroonPermission {
    /** The entity a permission grants access to. */
    entity: string;
    /** The action that is granted. */
    action: string;
  }
  
  export interface BakeMacaroonRequest {
    /** The list of permissions the new macaroon should grant. */
    permissions: MacaroonPermission[];
    /** The root key ID used to create the macaroon, must be a positive integer. */
    rootKeyId: number;
    /**
     * Informs the RPC on whether to allow external permissions that LND is not
     * aware of.
     */
    allowExternalPermissions: boolean;
  }
  
  export interface BakeMacaroonResponse {
    /** The hex encoded macaroon, serialized in binary format. */
    macaroon: string;
  }
  
  export interface ListMacaroonIDsRequest {}
  
  export interface ListMacaroonIDsResponse {
    /** The list of root key IDs that are in use. */
    rootKeyIds: number[];
  }
  
  export interface DeleteMacaroonIDRequest {
    /** The root key ID to be removed. */
    rootKeyId: number;
  }
  
  export interface DeleteMacaroonIDResponse {
    /** A boolean indicates that the deletion is successful. */
    deleted: boolean;
  }
  
  export interface MacaroonPermissionList {
    /** A list of macaroon permissions. */
    permissions: MacaroonPermission[];
  }
  
  export interface ListPermissionsRequest {}
  
  export interface ListPermissionsResponse {
    /**
     * A map between all RPC method URIs and their required macaroon permissions to
     * access them.
     */
    methodPermissions: { [key: string]: MacaroonPermissionList };
  }

  export interface Failure {
    /** Failure code as defined in the Lightning spec */
    code: Failure_FailureCode;
    /** An optional channel update message. */
    channelUpdate: ChannelUpdate | undefined;
    /** A failure type-dependent htlc value. */
    htlcMsat: number;
    /** The sha256 sum of the onion payload. */
    onionSha256: Uint8Array;
    /** A failure type-dependent cltv expiry value. */
    cltvExpiry: number;
    /** A failure type-dependent flags value. */
    flags: number;
    /**
     * The position in the path of the intermediate or final node that generated
     * the failure message. Position zero is the sender node.
     */
    failureSourceIndex: number;
    /** A failure type-dependent block height. */
    height: number;
  }


  export enum Failure_FailureCode {
    /**
     * RESERVED - The numbers assigned in this enumeration match the failure codes as
     * defined in BOLT #4. Because protobuf 3 requires enums to start with 0,
     * a RESERVED value is added.
     */
    RESERVED = 0,
    INCORRECT_OR_UNKNOWN_PAYMENT_DETAILS = 1,
    INCORRECT_PAYMENT_AMOUNT = 2,
    FINAL_INCORRECT_CLTV_EXPIRY = 3,
    FINAL_INCORRECT_HTLC_AMOUNT = 4,
    FINAL_EXPIRY_TOO_SOON = 5,
    INVALID_REALM = 6,
    EXPIRY_TOO_SOON = 7,
    INVALID_ONION_VERSION = 8,
    INVALID_ONION_HMAC = 9,
    INVALID_ONION_KEY = 10,
    AMOUNT_BELOW_MINIMUM = 11,
    FEE_INSUFFICIENT = 12,
    INCORRECT_CLTV_EXPIRY = 13,
    CHANNEL_DISABLED = 14,
    TEMPORARY_CHANNEL_FAILURE = 15,
    REQUIRED_NODE_FEATURE_MISSING = 16,
    REQUIRED_CHANNEL_FEATURE_MISSING = 17,
    UNKNOWN_NEXT_PEER = 18,
    TEMPORARY_NODE_FAILURE = 19,
    PERMANENT_NODE_FAILURE = 20,
    PERMANENT_CHANNEL_FAILURE = 21,
    EXPIRY_TOO_FAR = 22,
    MPP_TIMEOUT = 23,
    INVALID_ONION_PAYLOAD = 24,
    /** INTERNAL_FAILURE - An internal error occurred. */
    INTERNAL_FAILURE = 997,
    /** UNKNOWN_FAILURE - The error source is known, but the failure itself couldn't be decoded. */
    UNKNOWN_FAILURE = 998,
    /**
     * UNREADABLE_FAILURE - An unreadable failure result is returned if the received failure message
     * cannot be decrypted. In that case the error source is unknown.
     */
    UNREADABLE_FAILURE = 999,
    UNRECOGNIZED = -1,
  }

  export interface ChannelUpdate {
    /**
     * The signature that validates the announced data and proves the ownership
     * of node id.
     */
    signature: Uint8Array;
    /**
     * The target chain that this channel was opened within. This value
     * should be the genesis hash of the target chain. Along with the short
     * channel ID, this uniquely identifies the channel globally in a
     * blockchain.
     */
    chainHash: Uint8Array;
    /** The unique description of the funding transaction. */
    chanId: number;
    /**
     * A timestamp that allows ordering in the case of multiple announcements.
     * We should ignore the message if timestamp is not greater than the
     * last-received.
     */
    timestamp: number;
    /**
     * The bitfield that describes whether optional fields are present in this
     * update. Currently, the least-significant bit must be set to 1 if the
     * optional field MaxHtlc is present.
     */
    messageFlags: number;
    /**
     * The bitfield that describes additional meta-data concerning how the
     * update is to be interpreted. Currently, the least-significant bit must be
     * set to 0 if the creating node corresponds to the first node in the
     * previously sent channel announcement and 1 otherwise. If the second bit
     * is set, then the channel is set to be disabled.
     */
    channelFlags: number;
    /**
     * The minimum number of blocks this node requires to be added to the expiry
     * of HTLCs. This is a security parameter determined by the node operator.
     * This value represents the required gap between the time locks of the
     * incoming and outgoing HTLC's set to this node.
     */
    timeLockDelta: number;
    /** The minimum HTLC value which will be accepted. */
    htlcMinimumMsat: number;
    /**
     * The base fee that must be used for incoming HTLC's to this particular
     * channel. This value will be tacked onto the required for a payment
     * independent of the size of the payment.
     */
    baseFee: number;
    /** The fee rate that will be charged per millionth of a satoshi. */
    feeRate: number;
    /** The maximum HTLC value which will be accepted. */
    htlcMaximumMsat: number;
    /**
     * The set of data that was appended to this message, some of which we may
     * not actually know how to iterate or parse. By holding onto this data, we
     * ensure that we're able to properly validate the set of signatures that
     * cover these new fields, and ensure we're able to make upgrades to the
     * network in a forwards compatible manner.
     */
    extraOpaqueData: Uint8Array;
  }
  

  export interface MacaroonId {
    nonce: Uint8Array;
    storageId: Uint8Array;
    ops: Op[];
  }
  
  export interface Op {
    entity: string;
    actions: string[];
  }
  
  export interface CheckMacPermRequest {
    macaroon: Uint8Array;
    permissions: MacaroonPermission[];
    fullMethod: string;
  }
  
  export interface CheckMacPermResponse {
    valid: boolean;
  }
  
  export interface RPCMiddlewareRequest {
    /**
     * The unique ID of the intercepted original gRPC request. Useful for mapping
     * request to response when implementing full duplex message interception. For
     * streaming requests, this will be the same ID for all incoming and outgoing
     * middleware intercept messages of the _same_ stream.
     */
    requestId: number;
    /**
     * The raw bytes of the complete macaroon as sent by the gRPC client in the
     * original request. This might be empty for a request that doesn't require
     * macaroons such as the wallet unlocker RPCs.
     */
    rawMacaroon: Uint8Array;
    /**
     * The parsed condition of the macaroon's custom caveat for convenient access.
     * This field only contains the value of the custom caveat that the handling
     * middleware has registered itself for. The condition _must_ be validated for
     * messages of intercept_type stream_auth and request!
     */
    customCaveatCondition: string;
    /**
     * Intercept stream authentication: each new streaming RPC call that is
     * initiated against lnd and contains the middleware's custom macaroon
     * caveat can be approved or denied based upon the macaroon in the stream
     * header. This message will only be sent for streaming RPCs, unary RPCs
     * must handle the macaroon authentication in the request interception to
     * avoid an additional message round trip between lnd and the middleware.
     */
    streamAuth: StreamAuth | undefined;
    /**
     * Intercept incoming gRPC client request message: all incoming messages,
     * both on streaming and unary RPCs, are forwarded to the middleware for
     * inspection. For unary RPC messages the middleware is also expected to
     * validate the custom macaroon caveat of the request.
     */
    request: RPCMessage | undefined;
    /**
     * Intercept outgoing gRPC response message: all outgoing messages, both on
     * streaming and unary RPCs, are forwarded to the middleware for inspection
     * and amendment. The response in this message is the original response as
     * it was generated by the main RPC server. It can either be accepted
     * (=forwarded to the client), replaced/overwritten with a new message of
     * the same type, or replaced by an error message.
     */
    response: RPCMessage | undefined;
    /**
     * The unique message ID of this middleware intercept message. There can be
     * multiple middleware intercept messages per single gRPC request (one for the
     * incoming request and one for the outgoing response) or gRPC stream (one for
     * each incoming message and one for each outgoing response). This message ID
     * must be referenced when responding (accepting/rejecting/modifying) to an
     * intercept message.
     */
    msgId: number;
  }
  
  export interface StreamAuth {
    /**
     * The full URI (in the format /<rpcpackage>.<ServiceName>/MethodName, for
     * example /lnrpc.Lightning/GetInfo) of the streaming RPC method that was just
     * established.
     */
    methodFullUri: string;
  }
  
  export interface RPCMessage {
    /**
     * The full URI (in the format /<rpcpackage>.<ServiceName>/MethodName, for
     * example /lnrpc.Lightning/GetInfo) of the RPC method the message was sent
     * to/from.
     */
    methodFullUri: string;
    /** Indicates whether the message was sent over a streaming RPC method or not. */
    streamRpc: boolean;
    /**
     * The full canonical gRPC name of the message type (in the format
     * <rpcpackage>.TypeName, for example lnrpc.GetInfoRequest).
     */
    typeName: string;
    /**
     * The full content of the gRPC message, serialized in the binary protobuf
     * format.
     */
    serialized: Uint8Array;
  }
  
  export interface RPCMiddlewareResponse {
    /**
     * The request message ID this response refers to. Must always be set when
     * giving feedback to an intercept but is ignored for the initial registration
     * message.
     */
    refMsgId: number;
    /**
     * The registration message identifies the middleware that's being
     * registered in lnd. The registration message must be sent immediately
     * after initiating the RegisterRpcMiddleware stream, otherwise lnd will
     * time out the attempt and terminate the request. NOTE: The middleware
     * will only receive interception messages for requests that contain a
     * macaroon with the custom caveat that the middleware declares it is
     * responsible for handling in the registration message! As a security
     * measure, _no_ middleware can intercept requests made with _unencumbered_
     * macaroons!
     */
    register: MiddlewareRegistration | undefined;
    /**
     * The middleware received an interception request and gives feedback to
     * it. The request_id indicates what message the feedback refers to.
     */
    feedback: InterceptFeedback | undefined;
  }
  
  export interface MiddlewareRegistration {
    /**
     * The name of the middleware to register. The name should be as informative
     * as possible and is logged on registration.
     */
    middlewareName: string;
    /**
     * The name of the custom macaroon caveat that this middleware is responsible
     * for. Only requests/responses that contain a macaroon with the registered
     * custom caveat are forwarded for interception to the middleware. The
     * exception being the read-only mode: All requests/responses are forwarded to
     * a middleware that requests read-only access but such a middleware won't be
     * allowed to _alter_ responses. As a security measure, _no_ middleware can
     * change responses to requests made with _unencumbered_ macaroons!
     * NOTE: Cannot be used at the same time as read_only_mode.
     */
    customMacaroonCaveatName: string;
    /**
     * Instead of defining a custom macaroon caveat name a middleware can register
     * itself for read-only access only. In that mode all requests/responses are
     * forwarded to the middleware but the middleware isn't allowed to alter any of
     * the responses.
     * NOTE: Cannot be used at the same time as custom_macaroon_caveat_name.
     */
    readOnlyMode: boolean;
  }
  
  export interface InterceptFeedback {
    /**
     * The error to return to the user. If this is non-empty, the incoming gRPC
     * stream/request is aborted and the error is returned to the gRPC client. If
     * this value is empty, it means the middleware accepts the stream/request/
     * response and the processing of it can continue.
     */
    error: string;
    /**
     * A boolean indicating that the gRPC response should be replaced/overwritten.
     * As its name suggests, this can only be used as a feedback to an intercepted
     * response RPC message and is ignored for feedback on any other message. This
     * boolean is needed because in protobuf an empty message is serialized as a
     * 0-length or nil byte slice and we wouldn't be able to distinguish between
     * an empty replacement message and the "don't replace anything" case.
     */
    replaceResponse: boolean;
    /**
     * If the replace_response field is set to true, this field must contain the
     * binary serialized gRPC response message in the protobuf format.
     */
    replacementSerialized: Uint8Array;
  }
}