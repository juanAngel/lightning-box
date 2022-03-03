
declare module "lnd-grpc"{
    import {
        GetInfoResponse,
        ChannelBalanceRequest, 
        WalletBalanceResponse, 
        ChannelBalanceResponse, 
        GetTransactionsRequest,
        EstimateFeeResponse, 
        TransactionDetails,
        EstimateFeeRequest
    } from 'lnd-grpc-messages';

    import {EventEmitter} from 'events';


    export class Service extends EventEmitter{
        constructor(serviceName:string, options:any);

        is(...args);
        can(...args);
        observe(...args);

        get state():string;
        connect(...args);
        disconnect(...args);
    }

    export class Lightning extends Service{
        constructor(options:any);
        /**
         * Reconnect using closest rpc.proto file match.
         */
        onBeforeConnect():Promise<void>;
        getInfo():Promise<GetInfoResponse>;

        /**
         * lncli: `walletbalance`
         * WalletBalance returns total unspent outputs(confirmed and unconfirmed), all
         * confirmed unspent outputs and all unconfirmed unspent outputs under control
         * of the wallet.
         */
        async walletBalance():Promise<WalletBalanceResponse>;
        /**
         * lncli: `channelbalance`
         * ChannelBalance returns a report on the total funds across all open channels,
         * categorized in local/remote, pending local/remote and unsettled local/remote
         * balances.
         */
        async channelBalance(): Promise<ChannelBalanceResponse>;
        /**
         * lncli: `listchaintxns`
         * GetTransactions returns a list describing all the known transactions
         * relevant to the wallet.
         */
         async getTransactions(request: GetTransactionsRequest): Promise<TransactionDetails>;
        /**
         * lncli: `estimatefee`
         * EstimateFee asks the chain backend to estimate the fee rate and total fees
         * for a transaction that pays to multiple specified outputs.
         *
         * When using REST, the `AddrToAmount` map type can be set by appending
         * `&AddrToAmount[<address>]=<amount_to_send>` to the URL. Unfortunately this
         * map type doesn't appear in the REST API documentation because of a bug in
         * the grpc-gateway library.
         */
        estimateFee(request: EstimateFeeRequest): Promise<EstimateFeeResponse>;
        /**
         * lncli: `sendcoins`
         * SendCoins executes a request to send coins to a particular address. Unlike
         * SendMany, this RPC call only allows creating a single output at a time. If
         * neither target_conf, or sat_per_vbyte are set, then the internal wallet will
         * consult its fee model to determine a fee for the default confirmation
         * target.
         */
        SendCoins(request: SendCoinsRequest): Promise<SendCoinsResponse>;
        /**
         * lncli: `listunspent`
         * Deprecated, use walletrpc.ListUnspent instead.
         *
         * ListUnspent returns a list of all utxos spendable by the wallet with a
         * number of confirmations between the specified minimum and maximum.
         */
        ListUnspent(request: ListUnspentRequest): Promise<ListUnspentResponse>;
        /**
         * SubscribeTransactions creates a uni-directional stream from the server to
         * the client in which any newly discovered transactions relevant to the
         * wallet are sent over.
         */
        SubscribeTransactions(
            request: GetTransactionsRequest
        ): Observable<Transaction>;
        /**
         * lncli: `sendmany`
         * SendMany handles a request for a transaction that creates multiple specified
         * outputs in parallel. If neither target_conf, or sat_per_vbyte are set, then
         * the internal wallet will consult its fee model to determine a fee for the
         * default confirmation target.
         */
        SendMany(request: SendManyRequest): Promise<SendManyResponse>;
        /**
         * lncli: `newaddress`
         * NewAddress creates a new address under control of the local wallet.
         */
        NewAddress(request: NewAddressRequest): Promise<NewAddressResponse>;
        /**
         * lncli: `signmessage`
         * SignMessage signs a message with this node's private key. The returned
         * signature string is `zbase32` encoded and pubkey recoverable, meaning that
         * only the message digest and signature are needed for verification.
         */
        signMessage(request: SignMessageRequest): Promise<SignMessageResponse>;
        /**
         * lncli: `verifymessage`
         * VerifyMessage verifies a signature over a msg. The signature must be
         * zbase32 encoded and signed by an active node in the resident node's
         * channel database. In addition to returning the validity of the signature,
         * VerifyMessage also returns the recovered pubkey from the signature.
         */
         verifyMessage(request: VerifyMessageRequest): Promise<VerifyMessageResponse>;
        /**
         * lncli: `connect`
         * ConnectPeer attempts to establish a connection to a remote peer. This is at
         * the networking level, and is used for communication between nodes. This is
         * distinct from establishing a channel with a peer.
         */
        ConnectPeer(request: ConnectPeerRequest): Promise<ConnectPeerResponse>;
        /**
         * lncli: `disconnect`
         * DisconnectPeer attempts to disconnect one peer from another identified by a
         * given pubKey. In the case that we currently have a pending or active channel
         * with the target peer, then this action will be not be allowed.
         */
        DisconnectPeer(
            request: DisconnectPeerRequest
        ): Promise<DisconnectPeerResponse>;
        /**
         * lncli: `listpeers`
         * ListPeers returns a verbose listing of all currently active peers.
         */
        ListPeers(request: ListPeersRequest): Promise<ListPeersResponse>;
        /**
         * SubscribePeerEvents creates a uni-directional stream from the server to
         * the client in which any events relevant to the state of peers are sent
         * over. Events include peers going online and offline.
         */
        SubscribePeerEvents(request: PeerEventSubscription): Observable<PeerEvent>;
        /**
         * lncli: `getinfo`
         * GetInfo returns general information concerning the lightning node including
         * it's identity pubkey, alias, the chains it is connected to, and information
         * concerning the number of open+pending channels.
         */
        GetInfo(request: GetInfoRequest): Promise<GetInfoResponse>;
        /**
         * lncli: `getrecoveryinfo`
         * GetRecoveryInfo returns information concerning the recovery mode including
         * whether it's in a recovery mode, whether the recovery is finished, and the
         * progress made so far.
         */
        GetRecoveryInfo(
            request: GetRecoveryInfoRequest
        ): Promise<GetRecoveryInfoResponse>;
        /**
         * lncli: `pendingchannels`
         * PendingChannels returns a list of all the channels that are currently
         * considered "pending". A channel is pending if it has finished the funding
         * workflow and is waiting for confirmations for the funding txn, or is in the
         * process of closure, either initiated cooperatively or non-cooperatively.
         */
        PendingChannels(
            request: PendingChannelsRequest
        ): Promise<PendingChannelsResponse>;
        /**
         * lncli: `listchannels`
         * ListChannels returns a description of all the open channels that this node
         * is a participant in.
         */
        ListChannels(request: ListChannelsRequest): Promise<ListChannelsResponse>;
        /**
         * SubscribeChannelEvents creates a uni-directional stream from the server to
         * the client in which any updates relevant to the state of the channels are
         * sent over. Events include new active channels, inactive channels, and closed
         * channels.
         */
        SubscribeChannelEvents(
            request: ChannelEventSubscription
        ): Observable<ChannelEventUpdate>;
        /**
         * lncli: `closedchannels`
         * ClosedChannels returns a description of all the closed channels that
         * this node was a participant in.
         */
        ClosedChannels(
            request: ClosedChannelsRequest
        ): Promise<ClosedChannelsResponse>;
        /**
         * OpenChannelSync is a synchronous version of the OpenChannel RPC call. This
         * call is meant to be consumed by clients to the REST proxy. As with all
         * other sync calls, all byte slices are intended to be populated as hex
         * encoded strings.
         */
        OpenChannelSync(request: OpenChannelRequest): Promise<ChannelPoint>;
        /**
         * lncli: `openchannel`
         * OpenChannel attempts to open a singly funded channel specified in the
         * request to a remote peer. Users are able to specify a target number of
         * blocks that the funding transaction should be confirmed in, or a manual fee
         * rate to us for the funding transaction. If neither are specified, then a
         * lax block confirmation target is used. Each OpenStatusUpdate will return
         * the pending channel ID of the in-progress channel. Depending on the
         * arguments specified in the OpenChannelRequest, this pending channel ID can
         * then be used to manually progress the channel funding flow.
         */
        OpenChannel(request: OpenChannelRequest): Observable<OpenStatusUpdate>;
        /**
         * lncli: `batchopenchannel`
         * BatchOpenChannel attempts to open multiple single-funded channels in a
         * single transaction in an atomic way. This means either all channel open
         * requests succeed at once or all attempts are aborted if any of them fail.
         * This is the safer variant of using PSBTs to manually fund a batch of
         * channels through the OpenChannel RPC.
         */
        BatchOpenChannel(
            request: BatchOpenChannelRequest
        ): Promise<BatchOpenChannelResponse>;
        /**
         * FundingStateStep is an advanced funding related call that allows the caller
         * to either execute some preparatory steps for a funding workflow, or
         * manually progress a funding workflow. The primary way a funding flow is
         * identified is via its pending channel ID. As an example, this method can be
         * used to specify that we're expecting a funding flow for a particular
         * pending channel ID, for which we need to use specific parameters.
         * Alternatively, this can be used to interactively drive PSBT signing for
         * funding for partially complete funding transactions.
         */
        FundingStateStep(
            request: FundingTransitionMsg
        ): Promise<FundingStateStepResp>;
        /**
         * ChannelAcceptor dispatches a bi-directional streaming RPC in which
         * OpenChannel requests are sent to the client and the client responds with
         * a boolean that tells LND whether or not to accept the channel. This allows
         * node operators to specify their own criteria for accepting inbound channels
         * through a single persistent connection.
         */
        ChannelAcceptor(
            request: Observable<ChannelAcceptResponse>
        ): Observable<ChannelAcceptRequest>;
        /**
         * lncli: `closechannel`
         * CloseChannel attempts to close an active channel identified by its channel
         * outpoint (ChannelPoint). The actions of this method can additionally be
         * augmented to attempt a force close after a timeout period in the case of an
         * inactive peer. If a non-force close (cooperative closure) is requested,
         * then the user can specify either a target number of blocks until the
         * closure transaction is confirmed, or a manual fee rate. If neither are
         * specified, then a default lax, block confirmation target is used.
         */
        CloseChannel(request: CloseChannelRequest): Observable<CloseStatusUpdate>;
        /**
         * lncli: `abandonchannel`
         * AbandonChannel removes all channel state from the database except for a
         * close summary. This method can be used to get rid of permanently unusable
         * channels due to bugs fixed in newer versions of lnd. This method can also be
         * used to remove externally funded channels where the funding transaction was
         * never broadcast. Only available for non-externally funded channels in dev
         * build.
         */
        AbandonChannel(
            request: AbandonChannelRequest
        ): Promise<AbandonChannelResponse>;
        /**
         * lncli: `sendpayment`
         * Deprecated, use routerrpc.SendPaymentV2. SendPayment dispatches a
         * bi-directional streaming RPC for sending payments through the Lightning
         * Network. A single RPC invocation creates a persistent bi-directional
         * stream allowing clients to rapidly send payments through the Lightning
         * Network with a single persistent connection.
         *
         * @deprecated
         */
        SendPayment(request: Observable<SendRequest>): Observable<SendResponse>;
        /**
         * SendPaymentSync is the synchronous non-streaming version of SendPayment.
         * This RPC is intended to be consumed by clients of the REST proxy.
         * Additionally, this RPC expects the destination's public key and the payment
         * hash (if any) to be encoded as hex strings.
         */
        SendPaymentSync(request: SendRequest): Promise<SendResponse>;
        /**
         * lncli: `sendtoroute`
         * Deprecated, use routerrpc.SendToRouteV2. SendToRoute is a bi-directional
         * streaming RPC for sending payment through the Lightning Network. This
         * method differs from SendPayment in that it allows users to specify a full
         * route manually. This can be used for things like rebalancing, and atomic
         * swaps.
         *
         * @deprecated
         */
        SendToRoute(
            request: Observable<SendToRouteRequest>
        ): Observable<SendResponse>;
        /**
         * SendToRouteSync is a synchronous version of SendToRoute. It Will block
         * until the payment either fails or succeeds.
         */
        SendToRouteSync(request: SendToRouteRequest): Promise<SendResponse>;
        /**
         * lncli: `addinvoice`
         * AddInvoice attempts to add a new invoice to the invoice database. Any
         * duplicated invoices are rejected, therefore all invoices *must* have a
         * unique payment preimage.
         */
        AddInvoice(request: Invoice): Promise<AddInvoiceResponse>;
        /**
         * lncli: `listinvoices`
         * ListInvoices returns a list of all the invoices currently stored within the
         * database. Any active debug invoices are ignored. It has full support for
         * paginated responses, allowing users to query for specific invoices through
         * their add_index. This can be done by using either the first_index_offset or
         * last_index_offset fields included in the response as the index_offset of the
         * next request. By default, the first 100 invoices created will be returned.
         * Backwards pagination is also supported through the Reversed flag.
         */
        ListInvoices(request: ListInvoiceRequest): Promise<ListInvoiceResponse>;
        /**
         * lncli: `lookupinvoice`
         * LookupInvoice attempts to look up an invoice according to its payment hash.
         * The passed payment hash *must* be exactly 32 bytes, if not, an error is
         * returned.
         */
        LookupInvoice(request: PaymentHash): Promise<Invoice>;
        /**
         * SubscribeInvoices returns a uni-directional stream (server -> client) for
         * notifying the client of newly added/settled invoices. The caller can
         * optionally specify the add_index and/or the settle_index. If the add_index
         * is specified, then we'll first start by sending add invoice events for all
         * invoices with an add_index greater than the specified value. If the
         * settle_index is specified, the next, we'll send out all settle events for
         * invoices with a settle_index greater than the specified value. One or both
         * of these fields can be set. If no fields are set, then we'll only send out
         * the latest add/settle events.
         */
        SubscribeInvoices(request: InvoiceSubscription): Observable<Invoice>;
        /**
         * lncli: `decodepayreq`
         * DecodePayReq takes an encoded payment request string and attempts to decode
         * it, returning a full description of the conditions encoded within the
         * payment request.
         */
        DecodePayReq(request: PayReqString): Promise<PayReq>;
        /**
         * lncli: `listpayments`
         * ListPayments returns a list of all outgoing payments.
         */
        ListPayments(request: ListPaymentsRequest): Promise<ListPaymentsResponse>;
        /**
         * DeletePayment deletes an outgoing payment from DB. Note that it will not
         * attempt to delete an In-Flight payment, since that would be unsafe.
         */
        DeletePayment(request: DeletePaymentRequest): Promise<DeletePaymentResponse>;
        /**
         * DeleteAllPayments deletes all outgoing payments from DB. Note that it will
         * not attempt to delete In-Flight payments, since that would be unsafe.
         */
        DeleteAllPayments(
            request: DeleteAllPaymentsRequest
        ): Promise<DeleteAllPaymentsResponse>;
        /**
         * lncli: `describegraph`
         * DescribeGraph returns a description of the latest graph state from the
         * point of view of the node. The graph information is partitioned into two
         * components: all the nodes/vertexes, and all the edges that connect the
         * vertexes themselves. As this is a directed graph, the edges also contain
         * the node directional specific routing policy which includes: the time lock
         * delta, fee information, etc.
         */
        DescribeGraph(request: ChannelGraphRequest): Promise<ChannelGraph>;
        /**
         * lncli: `getnodemetrics`
         * GetNodeMetrics returns node metrics calculated from the graph. Currently
         * the only supported metric is betweenness centrality of individual nodes.
         */
        GetNodeMetrics(request: NodeMetricsRequest): Promise<NodeMetricsResponse>;
        /**
         * lncli: `getchaninfo`
         * GetChanInfo returns the latest authenticated network announcement for the
         * given channel identified by its channel ID: an 8-byte integer which
         * uniquely identifies the location of transaction's funding output within the
         * blockchain.
         */
        GetChanInfo(request: ChanInfoRequest): Promise<ChannelEdge>;
        /**
         * lncli: `getnodeinfo`
         * GetNodeInfo returns the latest advertised, aggregated, and authenticated
         * channel information for the specified node identified by its public key.
         */
        GetNodeInfo(request: NodeInfoRequest): Promise<NodeInfo>;
        /**
         * lncli: `queryroutes`
         * QueryRoutes attempts to query the daemon's Channel Router for a possible
         * route to a target destination capable of carrying a specific amount of
         * satoshis. The returned route contains the full details required to craft and
         * send an HTLC, also including the necessary information that should be
         * present within the Sphinx packet encapsulated within the HTLC.
         *
         * When using REST, the `dest_custom_records` map type can be set by appending
         * `&dest_custom_records[<record_number>]=<record_data_base64_url_encoded>`
         * to the URL. Unfortunately this map type doesn't appear in the REST API
         * documentation because of a bug in the grpc-gateway library.
         */
        QueryRoutes(request: QueryRoutesRequest): Promise<QueryRoutesResponse>;
        /**
         * lncli: `getnetworkinfo`
         * GetNetworkInfo returns some basic stats about the known channel graph from
         * the point of view of the node.
         */
        GetNetworkInfo(request: NetworkInfoRequest): Promise<NetworkInfo>;
        /**
         * lncli: `stop`
         * StopDaemon will send a shutdown request to the interrupt handler, triggering
         * a graceful shutdown of the daemon.
         */
        StopDaemon(request: StopRequest): Promise<StopResponse>;
        /**
         * SubscribeChannelGraph launches a streaming RPC that allows the caller to
         * receive notifications upon any changes to the channel graph topology from
         * the point of view of the responding node. Events notified include: new
         * nodes coming online, nodes updating their authenticated attributes, new
         * channels being advertised, updates in the routing policy for a directional
         * channel edge, and when channels are closed on-chain.
         */
        SubscribeChannelGraph(
            request: GraphTopologySubscription
        ): Observable<GraphTopologyUpdate>;
        /**
         * lncli: `debuglevel`
         * DebugLevel allows a caller to programmatically set the logging verbosity of
         * lnd. The logging can be targeted according to a coarse daemon-wide logging
         * level, or in a granular fashion to specify the logging for a target
         * sub-system.
         */
        DebugLevel(request: DebugLevelRequest): Promise<DebugLevelResponse>;
        /**
         * lncli: `feereport`
         * FeeReport allows the caller to obtain a report detailing the current fee
         * schedule enforced by the node globally for each channel.
         */
        FeeReport(request: FeeReportRequest): Promise<FeeReportResponse>;
        /**
         * lncli: `updatechanpolicy`
         * UpdateChannelPolicy allows the caller to update the fee schedule and
         * channel policies for all channels globally, or a particular channel.
         */
        UpdateChannelPolicy(
            request: PolicyUpdateRequest
        ): Promise<PolicyUpdateResponse>;
        /**
         * lncli: `fwdinghistory`
         * ForwardingHistory allows the caller to query the htlcswitch for a record of
         * all HTLCs forwarded within the target time range, and integer offset
         * within that time range, for a maximum number of events. If no maximum number
         * of events is specified, up to 100 events will be returned. If no time-range
         * is specified, then events will be returned in the order that they occured.
         *
         * A list of forwarding events are returned. The size of each forwarding event
         * is 40 bytes, and the max message size able to be returned in gRPC is 4 MiB.
         * As a result each message can only contain 50k entries. Each response has
         * the index offset of the last entry. The index offset can be provided to the
         * request to allow the caller to skip a series of records.
         */
        ForwardingHistory(
            request: ForwardingHistoryRequest
        ): Promise<ForwardingHistoryResponse>;
        /**
         * lncli: `exportchanbackup`
         * ExportChannelBackup attempts to return an encrypted static channel backup
         * for the target channel identified by it channel point. The backup is
         * encrypted with a key generated from the aezeed seed of the user. The
         * returned backup can either be restored using the RestoreChannelBackup
         * method once lnd is running, or via the InitWallet and UnlockWallet methods
         * from the WalletUnlocker service.
         */
        ExportChannelBackup(
            request: ExportChannelBackupRequest
        ): Promise<ChannelBackup>;
        /**
         * ExportAllChannelBackups returns static channel backups for all existing
         * channels known to lnd. A set of regular singular static channel backups for
         * each channel are returned. Additionally, a multi-channel backup is returned
         * as well, which contains a single encrypted blob containing the backups of
         * each channel.
         */
        ExportAllChannelBackups(
            request: ChanBackupExportRequest
        ): Promise<ChanBackupSnapshot>;
        /**
         * VerifyChanBackup allows a caller to verify the integrity of a channel backup
         * snapshot. This method will accept either a packed Single or a packed Multi.
         * Specifying both will result in an error.
         */
        VerifyChanBackup(
            request: ChanBackupSnapshot
        ): Promise<VerifyChanBackupResponse>;
        /**
         * lncli: `restorechanbackup`
         * RestoreChannelBackups accepts a set of singular channel backups, or a
         * single encrypted multi-chan backup and attempts to recover any funds
         * remaining within the channel. If we are able to unpack the backup, then the
         * new channel will be shown under listchannels, as well as pending channels.
         */
        RestoreChannelBackups(
            request: RestoreChanBackupRequest
        ): Promise<RestoreBackupResponse>;
        /**
         * SubscribeChannelBackups allows a client to sub-subscribe to the most up to
         * date information concerning the state of all channel backups. Each time a
         * new channel is added, we return the new set of channels, along with a
         * multi-chan backup containing the backup info for all channels. Each time a
         * channel is closed, we send a new update, which contains new new chan back
         * ups, but the updated set of encrypted multi-chan backups with the closed
         * channel(s) removed.
         */
        SubscribeChannelBackups(
            request: ChannelBackupSubscription
        ): Observable<ChanBackupSnapshot>;
        /**
         * lncli: `bakemacaroon`
         * BakeMacaroon allows the creation of a new macaroon with custom read and
         * write permissions. No first-party caveats are added since this can be done
         * offline.
         */
        BakeMacaroon(request: BakeMacaroonRequest): Promise<BakeMacaroonResponse>;
        /**
         * lncli: `listmacaroonids`
         * ListMacaroonIDs returns all root key IDs that are in use.
         */
        ListMacaroonIDs(
            request: ListMacaroonIDsRequest
        ): Promise<ListMacaroonIDsResponse>;
        /**
         * lncli: `deletemacaroonid`
         * DeleteMacaroonID deletes the specified macaroon ID and invalidates all
         * macaroons derived from that ID.
         */
        DeleteMacaroonID(
            request: DeleteMacaroonIDRequest
        ): Promise<DeleteMacaroonIDResponse>;
        /**
         * lncli: `listpermissions`
         * ListPermissions lists all RPC method URIs and their required macaroon
         * permissions to access them.
         */
        ListPermissions(
            request: ListPermissionsRequest
        ): Promise<ListPermissionsResponse>;
        /**
         * CheckMacaroonPermissions checks whether a request follows the constraints
         * imposed on the macaroon and that the macaroon is authorized to follow the
         * provided permissions.
         */
        CheckMacaroonPermissions(
            request: CheckMacPermRequest
        ): Promise<CheckMacPermResponse>;
        /**
         * RegisterRPCMiddleware adds a new gRPC middleware to the interceptor chain. A
         * gRPC middleware is software component external to lnd that aims to add
         * additional business logic to lnd by observing/intercepting/validating
         * incoming gRPC client requests and (if needed) replacing/overwriting outgoing
         * messages before they're sent to the client. When registering the middleware
         * must identify itself and indicate what custom macaroon caveats it wants to
         * be responsible for. Only requests that contain a macaroon with that specific
         * custom caveat are then sent to the middleware for inspection. The other
         * option is to register for the read-only mode in which all requests/responses
         * are forwarded for interception to the middleware but the middleware is not
         * allowed to modify any responses. As a security measure, _no_ middleware can
         * modify responses for requests made with _unencumbered_ macaroons!
         */
        RegisterRPCMiddleware(
            request: Observable<RPCMiddlewareResponse>
        ): Observable<RPCMiddlewareRequest>;
        /**
         * lncli: `sendcustom`
         * SendCustomMessage sends a custom peer message.
         */
        SendCustomMessage(
            request: SendCustomMessageRequest
        ): Promise<SendCustomMessageResponse>;
        /**
         * lncli: `subscribecustom`
         * SubscribeCustomMessages subscribes to a stream of incoming custom peer
         * messages.
         */
        SubscribeCustomMessages(
            request: SubscribeCustomMessagesRequest
        ): Observable<CustomMessage>;
    }

    export class Router extends Service{
        constructor(options:any);
        /**
       * Reconnect using closest rpc.proto file match.
       */
    }
    export interface LndGrpcOptions{
        lndconnectUri?:string;
        host?:string;
        cert?:string;
        macaroon?:string;
        waitForCert?:boolean|number;
        waitForMacaroon?:boolean|number;
    }

    class LndGrpc extends EventEmitter{
        constructor(options:LndGrpcOptions);

        supportedServices:Service[];
        services:{
            Lightning:Lightning,
            Router:Router
        }

        async connect():Promise<void>;

        is(...args:any)
        can(...args:any);
        observe(...args:any);

        async activateWalletUnlocker(...args);
        async activateLightning(...args);
        async disconnect(...args);
        async onBeforeDisconnect();
        async onAfterDisconnect();
        async onBeforeActivateWalletUnlocker();
        async onBeforeActivateLightning();
        async disconnectAll();
        async determineWalletState(options:{ keepalive: boolean }|undefined);
        checkWalletState(states:string):Promise<any>;
        waitForState(stateName:string);
        getWalletState():Promise<any>;
    }

    export default LndGrpc;
}


