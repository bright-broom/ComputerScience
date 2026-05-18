import { useState } from "react";

const phases = [
  { id: 0, name: "Phase 0", label: "全体地図", color: "#00D4FF", episodes: [0, 1, 2, 2.5] },
  { id: 1, name: "Phase 1", label: "プログラム・型・言語理論", color: "#7C3AED", episodes: [3, 4, 5] },
  { id: 2, name: "Phase 2", label: "DS・アルゴ・数学", color: "#059669", episodes: [6, 7, 8, 8.5] },
  { id: 3, name: "Phase 3", label: "コンピュータシステム", color: "#D97706", episodes: [9, 10, 11] },
  { id: 4, name: "Phase 4", label: "ネットワーク・Web", color: "#DC2626", episodes: [12, 13, 14] },
  { id: 5, name: "Phase 5", label: "DB・データ管理", color: "#0891B2", episodes: [15, 16, 17, 17.5] },
  { id: 6, name: "Phase 6", label: "設計・アーキテクチャ", color: "#BE185D", episodes: [18, 19, 20] },
  { id: 7, name: "Phase 7", label: "分散システム・SRE・性能", color: "#92400E", episodes: [21, 21.5, 22, 23, 23.5] },
  { id: 8, name: "Phase 8", label: "セキュリティ・品質", color: "#1D4ED8", episodes: [24, 25, 25.5] },
  { id: 9, name: "Phase 9", label: "AI / ML / LLM", color: "#065F46", episodes: [26, 27, 28, 29] },
  { id: 10, name: "Phase 10", label: "面接対策・キャリア", color: "#7C2D12", episodes: [30, 30.5] },
];

const episodes = [
  {
    id: 0,
    phase: 0,
    title: "CSとアプリ構造の全体地図",
    tag: "CORE",
    prompt: `CS専攻ではないソフトウェアエンジニア向けに、Computer Scienceと実務アプリ開発の全体地図を音声解説してください。形式は詳細。2人のホストが会話形式で、初学者にもわかるが、実務・設計判断・シニア面接に使える深さで話してください。
目的は、CSを科目暗記ではなく、React / Next.js、TypeScript、Python、DB、クラウド、Docker、Kubernetes、AI/ML、LLM / RAGに接続して理解することです。
3層で整理してください。Layer 1はアプリが動く仕組み（フロントエンド、API、DB、認証、ストレージ、キャッシュ、キュー、インフラ、CI/CD、監視）。Layer 2はCS基礎（データ構造、アルゴリズム、OS、ネットワーク、DB、コンピュータアーキテクチャ、数学・線形代数・統計、並行性理論）。Layer 3は応用（設計、分散システム、性能、テスト、セキュリティ、SRE、AI/ML、RAG、面接対策）。
Netflix風動画配信アプリを例に、動画一覧、ログイン、お気に入り、検索、動画アップロード、AIレコメンド、障害調査の流れを説明してください。最後に短期・中期・長期の学習ロードマップと、面接での全体像説明テンプレートを出してください。`,
  },
  {
    id: 1,
    phase: 0,
    title: "アプリはどう動いているのか",
    tag: "CORE",
    prompt: `CS非専攻エンジニア向けに、Webアプリがユーザー操作から画面表示、API、DB、認証、キャッシュ、ストレージ、非同期処理、本番運用までどう動くかを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱う流れ：ユーザーがログインする、動画一覧を見る、検索する、お気に入り登録する、動画詳細を開く、動画をアップロードする、AIレコメンドを見る、障害が起きて原因を追う。
各要素について、役割・置き場所・つながり・壊れた時の影響・面接での説明方法を整理してください。リクエストとデータがどう流れるかを重視してください。
面接で落ちやすい回答（フロントだけ・バックだけで説明する）と通過しやすい回答（データフロー全体で語る）の違いを示してください。最後にアプリ構造を説明する面接用テンプレートを作ってください。`,
  },
  {
    id: 2,
    phase: 0,
    title: "Netflix風アプリで見る全データフロー",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、Netflix風動画配信アプリのデータフロー全体を音声解説してください。形式は詳細。2人のホストが会話形式で話してください。
以下の7つのシナリオを順に扱ってください。(1)動画一覧表示：CDN・キャッシュ・DB・API。(2)ログイン：認証・セッション・JWT・Cookie。(3)お気に入り登録：PATCH・楽観更新・整合性。(4)検索：全文検索・インデックス・ランキング。(5)動画アップロード：S3・非同期処理・キュー・サムネイル生成。(6)AIレコメンド：特徴量・推論・Embedding・パーソナライズ。(7)障害調査：ログ・メトリクス・トレース・根本原因特定。
各シナリオで、データの流れ・ボトルネック・壊れやすい箇所・設計判断のトレードオフを説明してください。最後に面接でシステム設計を語る際の「データフロー説明テンプレート」を出してください。`,
  },
  {
    id: 2.5,
    phase: 0,
    title: "AIアプリの全体像プレビュー",
    tag: "NEW",
    prompt: `CS非専攻エンジニア向けに、現代のAIアプリ全体像をプレビュー回として音声解説してください。形式は詳細。2人のホストが会話形式で話してください。
このシリーズではCS基礎を先に固めてからAI/MLを深掘りしますが、この回では「最終的に何を作れるようになるか」のビジョンを共有します。
扱うテーマ：(1)AIチャットアプリの基本構造（フロント・LLM API・バックエンド）(2)RAG検索アプリの全体像（Embedding・Vector DB・Retrieval・Generation）(3)Agentアプリの仕組み（ツール呼び出し・計画・実行）(4)AI機能を持つNetflix風アプリ（レコメンド・字幕生成・サムネ自動生成）。
各構造で、どこにCS基礎が効くか（ベクトル空間→線形代数、検索→データ構造、非同期処理→並行性）を予告してください。詳細は第26-29回で深掘りすることを明示してください。最後に「AIアプリエンジニアとして語れるようになる地図」を出してください。`,
  },
  {
    id: 3,
    phase: 1,
    title: "プログラミングとは何か",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、プログラミングの本質を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：値・変数・関数・状態・制御構文・モジュール・抽象化・エラー処理・テスト。TypeScriptとPythonを使って具体的に説明してください。
特に重要な点：関数は「入力→処理→出力」という抽象化であること、状態は「バグの温床」であること、エラー処理を後回しにすると本番で落ちること、テストは「壊れていないことの証明」であること。
アンチパターン（グローバル変数の乱用・エラーの握りつぶし・テストなし）と良い設計の違いを示してください。面接で「あなたのコードの品質をどう担保しますか」と聞かれた時の答え方で締めてください。`,
  },
  {
    id: 4,
    phase: 1,
    title: "型・値・状態・抽象化",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、型・値・状態・抽象化を音声解説してください。形式は詳細。2人のホストが会話形式で、TypeScriptとPythonを比較しながら話してください。
扱うテーマ：プリミティブ型・参照型・型推論・null安全・Union型・Generics・型ガード・副作用・イミュータビリティ・抽象化の層。Netflix風アプリで「ユーザー型・動画型・APIレスポンス型」を設計する例を使ってください。
重要な観点：型はドキュメントであること、状態は最小化すべきであること、副作用を局所化するとテストしやすいこと。
TypeScriptのstrictモードがなぜ重要か、anyを使うと何が起きるかを具体的に。面接で「型設計で工夫していることは？」と聞かれた時の答え方で締めてください。`,
  },
  {
    id: 5,
    phase: 1,
    title: "型システム理論と言語処理系",
    tag: "EXPANDED",
    prompt: `CS非専攻エンジニア向けに、型システム理論と言語処理系を音声解説してください。形式は詳細。2人のホストが会話形式で、TypeScriptとPythonを比較しながら話してください。
扱うテーマ：(1)型システム理論：構造的型付け vs 名義的型付け・共変と反変・型推論アルゴリズム（Hindley-Milner系の考え方）・TypeScriptの型がTuring完全であることの意味・なぜ型エラーが読みにくいのか。(2)言語処理系：構文解析・AST・コンパイル vs インタプリタ・トランスパイル・JIT・GC・モジュール解決。(3)実務接続：Babel/Viteの役割・Next.jsのServer ComponentsがNode.jsランタイムを要求する理由・Pythonが機械学習で強い理由（C拡張・GIL）。
壊れ方：any濫用・循環依存・型と実行時値の乖離。面接で「TypeScriptを採用する理由は」「PythonとTypeScriptをどう使い分けるか」「コンパイラとインタプリタの違いは」の答え方で締めてください。`,
  },
  {
    id: 6,
    phase: 2,
    title: "データ構造",
    tag: "CORE",
    prompt: `CS非専攻エンジニア向けに、データ構造を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：配列・リスト・スタック・キュー・ハッシュマップ・集合・木（BST・ヒープ・B木・LSM Tree）・グラフ・トライ。
各データ構造について：どんな操作が速いか（O(1)・O(log n)・O(n)）、実務のどこに出るか、間違えると何が起きるか。
実務への接続例：RedisはハッシュマップとSorted Set・動画レコメンドはグラフ・通知キューはキュー・ファイルシステムは木・重複排除は集合・DBインデックスはB木・LSMはRocksDBやCassandraの基盤・オートコンプリートはトライ。
面接での頻出問題（LRU Cache・Top K動画・通知順序管理）のアプローチ方法と、「データ構造の選択基準を教えてください」の答え方で締めてください。`,
  },
  {
    id: 7,
    phase: 2,
    title: "アルゴリズムと計算量",
    tag: "CORE",
    prompt: `CS非専攻エンジニア向けに、アルゴリズムと計算量を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：(1)Big O記法と空間計算量。(2)基本アルゴリズム：探索（線形・二分）・ソート（クイック・マージ・TimSort）・ハッシュ・再帰・グラフ探索（BFS・DFS）。(3)アルゴリズム設計パラダイム：分割統治・貪欲法・動的計画法・削減（reduction）・ランダム化・近似アルゴリズム・なぜP=NP問題が重要か。
実務への接続：DBインデックスの二分探索・N+1問題はO(n²)・動画ランキングのソート安定性・レコメンドのグラフ探索・近似アルゴリズムが現実的な選択になる場面（ベクトル検索のHNSW）。
壊れ方：O(n²)ループがDBクエリに・再帰の深さ制限・正規表現でHTMLパース（文脈自由文法を正規表現で扱おうとする誤り）。面接で「このAPIが遅い原因を計算量から特定する」アプローチで締めてください。`,
  },
  {
    id: 8,
    phase: 2,
    title: "離散数学・論理・確率統計",
    tag: "SPLIT",
    prompt: `CS非専攻エンジニア向けに、離散数学・論理・確率統計を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風アプリを例にしてください。
扱うテーマ：(1)集合と論理：AND/OR/NOT・ド・モルガン則・SQL WHERE句との接続・述語論理。(2)関係とグラフ理論：二項関係・有向グラフ・無向グラフ・最短経路・依存関係解析。(3)確率：条件付き確率・ベイズの定理・キャッシュヒット率・エラー率の推定。(4)統計：平均・中央値・分散・パーセンタイル・P50/P95/P99レイテンシ・なぜ平均だけ見ると本番判断を誤るか。(5)A/Bテスト：統計的有意差・サンプルサイズ・P値・多重検定問題。
実務への接続：レコメンドのベイズ推定・P99レイテンシ重視の理由・A/Bテストの正しい解釈。面接で「A/Bテストの結果をどう判断するか」「P99とは何か、なぜ重要か」の答え方で締めてください。`,
  },
  {
    id: 8.5,
    phase: 2,
    title: "線形代数とベクトル空間",
    tag: "NEW",
    prompt: `CS非専攻エンジニア向けに、線形代数とベクトル空間を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風レコメンドとRAG検索アプリを例にしてください。
扱うテーマ：(1)ベクトルとは何か：方向と大きさを持つ数の組・幾何的意味と数値的意味。(2)ベクトル空間：基底・次元・部分空間。(3)行列：線形変換としての行列・行列の積の意味・転置・逆行列。(4)内積とノルム：類似度の数学的定義・cosine類似度・ユークリッド距離。(5)固有値と固有ベクトル：主成分分析（PCA）の直感。(6)テンソル：行列の一般化・なぜディープラーニングでテンソル演算が中心か。
実務への接続：Embedding（テキスト→ベクトル）の数学的本質・Vector DBの近傍探索が内積計算であること・ニューラルネットの重み行列の意味・GPUがなぜ線形代数で強いか。面接で「Embeddingの仕組みを説明してください」「なぜGPUがAIに必要か」の答え方で締めてください。`,
  },
  {
    id: 9,
    phase: 3,
    title: "コンピュータアーキテクチャ",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、コンピュータアーキテクチャを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：CPU（コア・クロック・命令実行・パイプライン・分岐予測）・メモリ階層（レジスタ・L1/L2/L3キャッシュ・RAM）・ストレージ（SSD・HDD・レイテンシ差）・I/O・スループット・レイテンシの数字感覚（L1キャッシュ1ns・RAM100ns・SSD100μs・ネットワーク1ms・データセンタ間100ms）。
実務への接続：なぜRedisはDBより速いか・CPUバウンドvsI/Oバウンド・Dockerコンテナのリソース制限・GPUが機械学習に使われる理由・動画エンコードがCPU集中型な理由・キャッシュフレンドリーなコードとは。面接で「このサービスのボトルネックはどこですか」「レイテンシ数字感覚を語ってください」の答え方で締めてください。`,
  },
  {
    id: 10,
    phase: 3,
    title: "OS・プロセス・メモリ",
    tag: "CORE",
    prompt: `CS非専攻エンジニア向けに、OS・プロセス・メモリを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：OS（カーネル・ユーザー空間・システムコール）・プロセスとスレッドの違い・メモリ（スタック・ヒープ・仮想メモリ・ページング）・ファイルシステム・ソケット・ポート・環境変数・シグナル・権限・仮想化・Cgroupsとnamespace。
実務への接続：Node.jsはシングルスレッドなぜスケールするか（イベントループ）・Pythonのマルチプロセスとスレッドの使い分け（GIL）・Dockerはプロセス分離の仕組みであること・ポート衝突・環境変数で設定注入する理由・OOMKillが起きる仕組み。
壊れ方：メモリリーク・ゾンビプロセス・ファイルディスクリプタ枯渇・ファイル権限ミス。面接で「コンテナとVMの違いは？」「GILとは何か、何が問題か」の答え方で締めてください。`,
  },
  {
    id: 11,
    phase: 3,
    title: "Docker・コンテナ・Kubernetes",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、Docker・コンテナ・Kubernetesを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：Dockerイメージ・コンテナ・Dockerfile・マルチステージビルド・Volume・Network・docker-compose。Kubernetesは：Pod・Deployment・StatefulSet・Service・Ingress・ConfigMap・Secret・HPA・ローリングアップデート・Liveness/Readiness Probe。
実務への接続：本番でAPIサーバー・Worker・DBを分離する構成・環境差異をなくす意味・スケールアウトの仕組み・ローリングデプロイで無停止更新・なぜステートフルなDBはStatefulSetか。
壊れ方：コンテナのOOMKill・ImagePullError・CrashLoopBackOff・Serviceの名前解決失敗・Probeミス設定でカスケード障害。面接で「コンテナ化のメリット・デメリットは？」「Kubernetesをなぜ使うのか？」の答え方で締めてください。`,
  },
  {
    id: 12,
    phase: 4,
    title: "ネットワークとHTTP（mTLS・QUIC含む）",
    tag: "EXPANDED",
    prompt: `CS非専攻エンジニア向けに、ネットワークとHTTPを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：(1)基礎：IP・TCP（3ウェイハンドシェイク・再送）・UDP・DNS・TLS・mTLS。(2)HTTP：HTTP/1.1・HTTP/2・HTTP/3とQUIC（なぜUDPベースか・モバイル時代の意義）・メソッド・ステータスコード・Cookie・CORS。(3)接続管理：Keep-Alive・Connection Pooling・WebSocket・gRPC。(4)インフラ：CDN・ロードバランサー（L4 vs L7・consistent hashing・least connection）・Service Mesh（Istio・Linkerd・サイドカーパターン）。
実務への接続：動画ストリーミングはなぜHTTP/2またはHTTP/3か・CDNがどこでキャッシュするか・CORSエラーの本当の原因・マイクロサービス間通信のmTLS。面接で「HTTPSの仕組みを説明してください」「Service Meshの役割は？」の答え方で締めてください。`,
  },
  {
    id: 13,
    phase: 4,
    title: "ブラウザ・レンダリング・React",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、ブラウザのレンダリング仕組みとReactを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：DOM・CSSOMツリー・レイアウト・ペイント・コンポジット・Reflow・Repaint。ReactはVirtual DOM・Reconciliation・Fiber・状態更新のバッチ処理・useEffect・useCallback・useMemo。Next.jsはSSR・SSG・ISR・Server Components・Client Components・Hydration・App RouterとPages Routerの違い。
壊れ方：無限再レンダリング・Hydrationミスマッチ・メモリリーク（useEffectクリーンアップ漏れ）。面接で「React Server Componentsのメリットとトレードオフは？」の答え方で締めてください。`,
  },
  {
    id: 14,
    phase: 4,
    title: "API設計",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、API設計を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリとGitHub風プラットフォームを例にしてください。
扱うテーマ：REST（リソース設計・HTTPメソッド・ステータスコード・べき等性）・GraphQL（クエリ・ミューテーション・N+1問題）・RPC・gRPC（ストリーミングパターン）。共通テーマとしてDTO・バリデーション・エラーレスポンス・ページネーション（カーソル vs オフセット）・レート制限・バージョニング・冪等キー。
トレードオフ：REST vs GraphQL・オフセットページネーション vs カーソルベース・同期APIvs非同期API・gRPCのストリーミング種別。
アンチパターン：動詞URLの使用・エラーを200で返す・ページネーションなし。面接で「APIを設計してください」と言われた時の答え方のテンプレートで締めてください。`,
  },
  {
    id: 15,
    phase: 5,
    title: "RDBとSQL",
    tag: "CORE",
    prompt: `CS非専攻エンジニア向けに、リレーショナルDB・SQLを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：テーブル・主キー・外部キー・JOIN（INNER・LEFT・RIGHT）・インデックス（B木・複合インデックス・カバリングインデックス）・制約（UNIQUE・NOT NULL・FK）・正規化（1NF〜3NF）・ER図・EXPLAIN。
実務への接続：N+1問題の発生パターンと解決・スロークエリの特定・インデックスを張るべき列の判断基準・正規化と非正規化のトレードオフ（読み速度 vs 更新整合性）。
壊れ方：インデックスなし全件スキャン・Cartesian JOIN・インデックスが効かないLIKE '%term'。面接で「DBの設計で工夫した点は？」の答え方で締めてください。`,
  },
  {
    id: 16,
    phase: 5,
    title: "トランザクション・ロック・整合性",
    tag: "CORE",
    prompt: `CS非専攻エンジニア向けに、トランザクション・ロック・整合性を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：ACID（原子性・一貫性・分離性・耐久性）・分離レベル（READ UNCOMMITTED〜SERIALIZABLE）・ダーティリード・ファントムリード・ノンリピータブルリード・行ロック・テーブルロック・デッドロック・楽観ロック（version列）・悲観ロック（SELECT FOR UPDATE）。
実務への接続：お気に入り登録の同時更新・在庫の二重購入・動画の視聴カウント更新。トレードオフ：分離レベルを上げると整合性は上がるがスループットが下がる。
壊れ方：デッドロック・ロング・トランザクション・楽観ロックの競合率が高い設計。面接で「同時更新の競合をどう防ぎますか？」の答え方で締めてください。`,
  },
  {
    id: 17,
    phase: 5,
    title: "NoSQL・検索・ストレージ",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、NoSQL・検索エンジン・オブジェクトストレージを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：Key-Value（Redis：セッション・キャッシュ・レート制限）・Document DB（MongoDB：動画メタデータ・スキーマ柔軟性）・Wide Column（Cassandra：時系列・LSM Tree）・Graph DB（Neo4j：レコメンドグラフ）・検索エンジン（Elasticsearch：全文検索・転置インデックス・アナライザー）・オブジェクトストレージ（S3：動画ファイル・署名付きURL・ライフサイクル）・CDN（エッジキャッシュ・プッシュvsプル）。
トレードオフ：RDB vs NoSQL・検索エンジンへのデータ同期コスト・CDNの鮮度 vs 速度。面接で「検索機能をどう設計しますか？」「NoSQLをいつ選ぶか」の答え方で締めてください。`,
  },
  {
    id: 17.5,
    phase: 5,
    title: "CDC・イベントソーシング・CQRS",
    tag: "NEW",
    prompt: `CS非専攻エンジニア向けに、CDC・イベントソーシング・CQRSを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風アプリとGitHub風プラットフォームを例にしてください。
扱うテーマ：(1)CDC（Change Data Capture）：DBの変更を捕捉してKafkaに流す・Debeziumの役割・WAL/binlogベースのCDC・なぜポーリングではダメか。(2)イベントソーシング：状態ではなくイベント列を真実とする・イベントストア・リプレイ・GitHubのコミット履歴的発想。(3)CQRS：コマンド側とクエリ側を分ける・読み込み専用のリードモデル・最終的整合性を許容する設計。
実務への接続：マイクロサービス間でDBを共有しない原則・お気に入り変更を検索インデックスに反映する仕組み・監査ログ要件への対応・OLTPとOLAPの橋渡し。
壊れ方：イベントスキーマの破壊的変更・リプレイ非対称性・CQRSの過剰適用。面接で「マイクロサービス間でデータをどう同期しますか」の答え方で締めてください。`,
  },
  {
    id: 18,
    phase: 6,
    title: "ソフトウェア設計の基礎",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、ソフトウェア設計の基礎を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：SOLID原則（単一責任・開放閉鎖・リスコフ置換・インターフェース分離・依存性逆転）・凝集度と結合度・レイヤードアーキテクチャ（Presentation・Application・Domain・Infrastructure）・UseCase層・Repository層・依存性注入・インターフェースによる抽象化。
実務への接続：動画アップロードのUseCase設計・Repositoryを差し替えてテストする方法・Fat Controllerのリファクタリング。
アンチパターン：ビジネスロジックがController・DBアクセスがUI層・テスト不可能な設計。面接で「レイヤーをどう分けますか？」の答え方で締めてください。`,
  },
  {
    id: 19,
    phase: 6,
    title: "Clean Architecture・DDD入門",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、Clean ArchitectureとDDD入門を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリとGitHub風プラットフォームを例にしてください。
扱うテーマ：Clean Architectureの同心円モデル・依存関係逆転の原則・Entity・Value Object・UseCase・Repository（インターフェース）・Adapter。DDDはドメインモデル・集約・境界づけられたコンテキスト・ドメインサービス・ユビキタス言語。
実務への接続：動画ドメイン（Video・View・Comment）の集約設計・ユーザードメインと課金ドメインの境界・コンテキスト境界をどうAPIに反映するか。
アンチパターン：Anemic Domain Model・すべてをDBモデルで表現する設計。面接で「Clean Architectureを採用したことはありますか？なぜですか？」の答え方で締めてください。`,
  },
  {
    id: 20,
    phase: 6,
    title: "モノリス・マイクロサービス",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、モノリスとマイクロサービスの設計判断を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリとGitHub風プラットフォームを例にしてください。
扱うテーマ：モノリス（構造・利点・限界）・モジュラーモノリス（モノリスの中での責務分割）・マイクロサービス（サービス分割基準・チーム境界・独立デプロイ・サービスメッシュ）・イベント駆動アーキテクチャ・API Gateway・BFF（Backend for Frontend）。
トレードオフ：マイクロサービスは分散トランザクション・ネットワークレイテンシ・運用コストが増える。モジュラーモノリスで始めることのメリット。
壊れ方：サービス間の強結合・カスケード障害・分散トランザクションの整合性問題。面接で「マイクロサービスにいつ移行しますか？」の答え方で締めてください。`,
  },
  {
    id: 21,
    phase: 7,
    title: "分散システム入門",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、分散システムの基礎を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：ロードバランサー（L4 vs L7）・水平スケールと垂直スケール・レプリケーション（マスター・スレーブ・マスター・マスター）・シャーディング（ハッシュ vs レンジ・consistent hashing）・CAP定理（一貫性 vs 可用性 vs 分断耐性）・PACELC定理・結果整合性・タイムアウト・リトライ・冪等性・サーキットブレーカー・バルクヘッド・冪等キー。
実務への接続：動画視聴数の分散カウント・お気に入りの結果整合性許容・決済APIの冪等リトライ。
壊れ方：シャードキーの偏り・カスケード障害・タイムアウト設定なし・リトライストーム・スプリットブレイン。面接で「このシステムをどうスケールしますか？」の答え方で締めてください。`,
  },
  {
    id: 21.5,
    phase: 7,
    title: "分散合意・Lamport時計・Sagaパターン",
    tag: "NEW",
    prompt: `CS非専攻エンジニア向けに、分散合意とイベント順序の理論を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風アプリとGitHub風プラットフォームを例にしてください。
扱うテーマ：(1)時間と順序：物理時計の問題・Lamport論理時計・ベクトル時計・ハイブリッド論理時計（HLC）。(2)合意アルゴリズム：Paxos・Raftの直感的理解・etcd/Consulがどう動くか・リーダー選出。(3)一貫性モデル：線形化可能性（Linearizability）vs 直列化可能性（Serializability）の違い・因果整合性。(4)分散トランザクション：2PC・3PCの限界・Sagaパターン（オーケストレーションvsコレオグラフィ）・補償トランザクション。
実務への接続：マイクロサービス間の決済処理・お気に入り登録のイベント順序・分散ロックの危険性。面接で「なぜRaftが必要か」「Sagaパターンを使う場面は」「線形化可能性とは」の答え方で締めてください。`,
  },
  {
    id: 22,
    phase: 7,
    title: "キャッシュ・キュー・非同期処理",
    tag: "CORE",
    prompt: `CS非専攻エンジニア向けに、キャッシュ・キュー・非同期処理を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：キャッシュ（Redis・CDN・ブラウザキャッシュ・TTL・Cache Aside・Write Through・Write Back・Read Through・キャッシュstampede・thundering herd）。キュー（SQS・RabbitMQ・Kafka・メッセージの保証・at-least-once・at-most-once・exactly-once・デッドレターキュー・リトライポリシー・バックプレッシャ）。非同期処理（Worker・バックグラウンドジョブ・動画変換・サムネイル生成・メール送信）。
トレードオフ：キャッシュは速いが古くなる・キューは非同期だが結果が即座に見えない・at-least-onceは冪等性が必要・Kafka vs SQSの選択基準。面接で「キャッシュ戦略を設計してください」の答え方で締めてください。`,
  },
  {
    id: 23,
    phase: 7,
    title: "監視・ログ・障害対応",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、監視・ログ・障害対応を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：ログ（構造化ログ・ログレベル・相関ID）・メトリクス（RED：Rate・Errors・Duration / USE：Utilization・Saturation・Errors / Four Golden Signals）・分散トレーシング（Jaeger・OpenTelemetry）・アラート（SLI・SLO・SLA・エラーバジェット）・ダッシュボード（Grafana）・障害対応フロー・ポストモーテム文化・カオスエンジニアリング入門。
実務への接続：動画アップロード失敗の根本原因特定・P99レイテンシ劣化の調査・エラーレートアラートの閾値設計。
アンチパターン：ログがない・アラートが多すぎてアラート疲れ・SLO未定義。面接で「本番障害をどう調査しますか？」「SLOをどう設定するか」の答え方で締めてください。`,
  },
  {
    id: 23.5,
    phase: 7,
    title: "パフォーマンスエンジニアリング診断学",
    tag: "NEW",
    prompt: `CS非専攻エンジニア向けに、パフォーマンス問題を体系的に診断する方法論を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：(1)診断方法論：USE法・RED法・Four Golden Signals・ボトルネック特定の順序（外側から内側へ）。(2)レイヤー別ボトルネック：フロント（バンドルサイズ・Hydration）・ネットワーク（DNS・TLS・帯域）・アプリ（CPU・GC・ロック競合）・DB（スロークエリ・接続プール枯渇）・外部依存（API・外部サービス）。(3)ツール：Flame Graph・Continuous Profiling・APM（Datadog/New Relic）・分散トレース・eBPF。(4)深い問題：GCポーズ・TCP輻輳・コンテキストスイッチ・False Sharing・コールドキャッシュ。
実務への接続：P99だけ遅い原因の追い方・週次で劣化する性能問題・スパイクトラフィックへの対応。面接で「本番が突然遅くなった、どう調査しますか」「Flame Graphをどう読みますか」の答え方で締めてください。`,
  },
  {
    id: 24,
    phase: 8,
    title: "Webセキュリティ基礎",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、Webセキュリティの基礎を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリを例にしてください。
扱うテーマ：XSS（反射型・保存型・DOM型・CSP）・CSRF（SameSite Cookie・CSRFトークン）・SQLインジェクション（プリペアドステートメント）・SSRF・セキュリティヘッダー（HSTS・X-Frame-Options・CSP）・秘密情報管理（環境変数・Secret Manager・ローテーション）・監査ログ（誰が・いつ・何を）・依存ライブラリの脆弱性管理（SBOM・Dependabot）・OWASP Top 10。
壊れ方：XSSでセッション盗難・SQLインジェクションでDB全件漏洩・シークレットをGitにコミット・依存ライブラリのサプライチェーン攻撃。面接で「セキュリティをどう設計に組み込みますか？」の答え方で締めてください。`,
  },
  {
    id: 25,
    phase: 8,
    title: "認証・認可・権限設計",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、認証・認可・権限設計を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリとGitHub風プラットフォームを例にしてください。
扱うテーマ：認証（Authentication）と認可（Authorization）の違い・セッションベース認証・JWT（構造・検証・失効問題・リフレッシュトークン）・OAuth 2.0（認可フロー・スコープ・PKCE）・OpenID Connect（IDトークン・UserInfo）・RBAC（ロールベース）・ABAC（属性ベース）・ReBAC（関係ベース・GitHub的権限）・リソース単位の権限（自分の動画しか削除できない）。
トレードオフ：JWTはステートレスだが失効が難しい・セッションは失効しやすいがDB負荷・ReBACはGitHub的だが複雑。
壊れ方：JWT秘密鍵の漏洩・認可チェック漏れ・過剰権限付与・IDOR脆弱性。面接で「認証と認可の設計を説明してください」の答え方で締めてください。`,
  },
  {
    id: 25.5,
    phase: 8,
    title: "テスト戦略とデプロイメント",
    tag: "NEW",
    prompt: `CS非専攻エンジニア向けに、テスト戦略とデプロイメントを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリとGitHub風プラットフォームを例にしてください。
扱うテーマ：(1)テストピラミッド：Unit/Integration/E2Eのバランス・テストダブル（mock/stub/fake/spy）・property-based testing。(2)契約テスト：Consumer-Driven Contract Testing（Pact）・マイクロサービス間の互換性保証。(3)カオスエンジニアリング：Netflix Chaos Monkeyの思想・本番で意図的に壊す価値。(4)CI/CDパイプライン：GitHub Actions/CircleCIの典型構成・テスト並列化・キャッシュ戦略。(5)デプロイ戦略：Blue/Green・Canary・Rolling・Feature Flags・Progressive Delivery（LaunchDarkly）。(6)Trunk-Based Development vs GitFlow。
実務への接続：マイクロサービスでのテスト戦略・大規模リファクタの安全な進め方・本番事故を防ぐデプロイ設計。面接で「テスト戦略を語ってください」「Canaryデプロイの判断基準は」の答え方で締めてください。`,
  },
  {
    id: 26,
    phase: 9,
    title: "機械学習の全体地図",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、機械学習の全体地図を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリのレコメンドを例にしてください。
扱うテーマ：教師あり学習（分類・回帰）・教師なし学習（クラスタリング・次元削減）・強化学習（概要）・特徴量エンジニアリング・学習と推論の分離・過学習と汎化・正則化・損失関数・評価指標（精度・再現率・F1・RMSE・AUC）・バッチ学習 vs オンライン学習・モデルのデプロイ（ONNX・TorchServe・SageMaker）・MLOps入門。
実務への接続：動画レコメンドの協調フィルタリング vs コンテンツベース・特徴量はどこから来るか（Feature Store）・推論レイテンシの要件・モデルドリフトの検知。面接で「MLモデルを本番に組み込む時の考慮事項は？」の答え方で締めてください。`,
  },
  {
    id: 27,
    phase: 9,
    title: "ニューラルネットワーク・PyTorch入門",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、ニューラルネットワークとPyTorchの基礎を音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリのサムネイル分類やレコメンドを例にしてください。第8.5回（線形代数）の知識を前提として接続してください。
扱うテーマ：テンソル（行列の一般化として）・重みとバイアス・活性化関数（ReLU・Sigmoid・Softmax）・損失関数（Cross Entropy・MSE）・勾配降下法（SGD・Adam）・バックプロパゲーション・バッチサイズ・エポック・学習率・ドロップアウト・BatchNorm・CNN（画像）・Transformer（テキスト・Attention機構）・GPU vs CPU・PyTorchでの実装パターン。
実務への接続：サムネイルのCTR予測・テキストから動画を検索する埋め込みモデル・なぜTransformerがLLMの基盤か。面接で「ニューラルネットワークを使う時しない時の判断基準は？」「Attentionとは何か」の答え方で締めてください。`,
  },
  {
    id: 28,
    phase: 9,
    title: "LLM・RAG・Vector DB",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、LLM・RAG・Vector DBを音声解説してください。形式は詳細。2人のホストが会話形式で、Netflix風動画配信アプリとRAG検索アプリを例にしてください。
扱うテーマ：LLM（トークン・コンテキストウィンドウ・Temperature・Streaming・関数呼び出し）・Embedding（テキストを数値ベクトルに変換する仕組み・第8.5回の線形代数で説明）・Vector DB（pgvector・Pinecone・Weaviate・近傍探索HNSW・第7回の近似アルゴリズムとの接続）・RAGパイプライン（Chunking・Embedding・Retriever・Reranker・Generator）・ハイブリッド検索（BM25 + ベクトル）・プロンプトエンジニアリング・ハルシネーション対策・評価（RAGAS）。
トレードオフ：RAGは鮮度問題・Chunkingの粒度・検索精度 vs 速度・コスト vs 品質。面接で「RAGシステムの品質をどう評価・改善しますか？」の答え方で締めてください。`,
  },
  {
    id: 29,
    phase: 9,
    title: "AIアプリのアーキテクチャ",
    tag: "",
    prompt: `CS非専攻エンジニア向けに、AIアプリのアーキテクチャを音声解説してください。形式は詳細。2人のホストが会話形式で、RAG検索アプリとNetflix風動画配信アプリのAI機能を例にしてください。
扱うテーマ：LLM APIの呼び出し設計（ストリーミング・タイムアウト・リトライ・フォールバック・マルチプロバイダ）・Agentパターン（ツール呼び出し・ReAct・計画と実行・MCP）・非同期処理（Celery・BullMQ）・プロンプトのバージョン管理・LLMの評価（LLM-as-Judge・人手評価・回帰テスト）・コスト管理（トークン数・セマンティックキャッシュ）・セキュリティ（プロンプトインジェクション・PII漏洩・ジェイルブレイク）・監視（LLMトレース・Langfuse・LangSmith）・データ基盤（評価データセット・特徴量パイプライン）。
壊れ方：コンテキストウィンドウ超過・ハルシネーションが気づかれない・コスト爆発・プロンプトインジェクション。面接で「AIアプリの本番運用で注意することは？」の答え方で締めてください。`,
  },
  {
    id: 30,
    phase: 10,
    title: "アーキテクチャ設計面接の型",
    tag: "CORE",
    prompt: `CS非専攻エンジニア向けに、シニアエンジニアのアーキテクチャ設計面接の型を音声解説してください。2人のホストが、面接官役と候補者役で会話してください。
扱うテーマ：要件確認・非機能要件（ユーザー数・データ量・レイテンシ・可用性）・API設計・DB設計・認証・キャッシュ・キュー・非同期処理・監視・セキュリティ・スケーリング・トレードオフ・容量見積もり（back-of-the-envelope）。
題材はNetflix風動画配信アプリ（動画のアップロードから配信まで）・GitHub風開発者プラットフォーム（Issue・PR・CI/CD通知）・RAG検索アプリの3つにしてください。
候補者が落ちやすい回答（技術の列挙だけ・トレードオフを言わない・スケール計算しない・要件確認しない）と通過しやすい回答（要件から逆算・判断根拠・捨てたものを明示・数字で語る）の違いを具体的に示してください。最後に「なぜその設計か」「何を捨てたか」「将来どう拡張するか」を語るテンプレートで締めてください。`,
  },
  {
    id: 30.5,
    phase: 10,
    title: "技術選定とキャリア戦略",
    tag: "NEW",
    prompt: `CS非専攻エンジニア向けに、技術選定の説明力とキャリア戦略を音声解説してください。形式は詳細。2人のホストが会話形式で、面接の最終ラウンド・経営層との対話を想定してください。
扱うテーマ：(1)技術選定の説明：なぜその言語/フレームワーク/DBを選んだか・トレードオフをどう伝えるか・組織制約をどう考慮したか・「流行っているから」と言わない技術。(2)影響範囲の拡大：個人コードからチーム/組織への影響・テックリードとシニアエンジニアの違い・技術文書（ADR：Architecture Decision Record）の書き方。(3)非エンジニアとの対話：ビジネス価値の語り方・コストの説明・リスクコミュニケーション。(4)キャリア戦略：T字型 vs π字型・専門性の深め方・AI時代に何を磨くか・700-800万円超えのために評価される行動。
面接で「あなたが技術選定で工夫したことは」「組織でどう影響を広げてきたか」「ビジネスサイドにどう説明するか」の答え方で締めてください。`,
  },
];

const coreEpisodes = [0, 1, 6, 7, 10, 12, 15, 16, 22, 30];
const newEpisodes = [2.5, 8.5, 17.5, 21.5, 23.5, 25.5, 30.5];
const expandedEpisodes = [5, 12];
const splitEpisodes = [8];

export default function ComputerScienceSeriesPage() {
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showChangelog, setShowChangelog] = useState(false);

  const getPhaseColor = (phaseId) => {
    return phases.find((p) => p.episodes.includes(phaseId))?.color || "#666";
  };

  const getPhaseInfo = (phaseId) => {
    return phases.find((p) => p.episodes.includes(phaseId));
  };

  const filtered = episodes.filter((ep) => {
    const matchFilter =
      filter === "all" ||
      (filter === "core" && coreEpisodes.includes(ep.id)) ||
      (filter === "new" &&
        (newEpisodes.includes(ep.id) ||
          expandedEpisodes.includes(ep.id) ||
          splitEpisodes.includes(ep.id)));
    const matchSearch =
      search === "" ||
      ep.title.toLowerCase().includes(search.toLowerCase()) ||
      ep.prompt.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const selectedEp = episodes.find((e) => e.id === selected);

  const formatId = (id) => {
    if (Number.isInteger(id)) {
      return String(id).padStart(2, "0");
    }
    return String(id);
  };

  const selectedIndex = selectedEp ? episodes.findIndex((e) => e.id === selectedEp.id) : -1;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#e8e4dc",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #1e1e2e",
          padding: "32px 40px 24px",
          background: "linear-gradient(180deg, #0d0d18 0%, #0a0a0f 100%)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  color: "#4a4a6a",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  fontFamily: "monospace",
                }}
              >
                NotebookLM Learning Series / Revised Edition
              </div>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: "normal",
                  margin: "0 0 4px",
                  letterSpacing: "-0.02em",
                  color: "#e8e4dc",
                }}
              >
                実務エンジニアのための
              </h1>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: "normal",
                  margin: "0 0 16px",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg, #00D4FF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                応用Computer Science
              </h1>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "#6b6b8a",
                    fontFamily: "monospace",
                  }}
                >
                  Phase 0-10 / 全33本（旧31本＋7新規）
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#00D4FF",
                    border: "1px solid #00D4FF33",
                    padding: "2px 8px",
                    borderRadius: 2,
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                  }}
                >
                  CORE x10
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#D97706",
                    border: "1px solid #D9770633",
                    padding: "2px 8px",
                    borderRadius: 2,
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                  }}
                >
                  NEW x7
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowChangelog(!showChangelog)}
              style={{
                background: showChangelog ? "#D9770622" : "transparent",
                border: "1px solid #D9770644",
                color: "#D97706",
                padding: "6px 14px",
                borderRadius: 2,
                fontSize: 11,
                fontFamily: "monospace",
                cursor: "pointer",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
              }}
            >
              {showChangelog ? "x CLOSE" : "CHANGELOG"}
            </button>
          </div>
        </div>
      </div>

      {showChangelog && (
        <div
          style={{
            background: "#0d0d18",
            borderBottom: "1px solid #1e1e2e",
            padding: "20px 40px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              style={{
                fontSize: 11,
                color: "#D97706",
                fontFamily: "monospace",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              レビュー反映：第2版変更点
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 24,
                fontSize: 13,
                color: "#a8a4ac",
                lineHeight: 1.8,
              }}
            >
              <div>
                <div style={{ color: "#00D4FF", marginBottom: 6, fontWeight: 600 }}>
                  Priority 1（理論派 × 実務派の共通指摘）
                </div>
                <div>・第8.5回「線形代数とベクトル空間」を独立化</div>
                <div>・第25.5回「テスト戦略とデプロイメント」を新設</div>
                <div>・第21.5回「分散合意・Lamport時計・Saga」を新設</div>
              </div>
              <div>
                <div style={{ color: "#7C3AED", marginBottom: 6, fontWeight: 600 }}>
                  Priority 2（実務深化）
                </div>
                <div>・第23.5回「パフォーマンス診断学」を新設</div>
                <div>・第17.5回「CDC・イベントソーシング・CQRS」を新設</div>
                <div>・第30.5回「技術選定とキャリア戦略」を新設</div>
              </div>
              <div>
                <div style={{ color: "#059669", marginBottom: 6, fontWeight: 600 }}>
                  Priority 3（理論補強）
                </div>
                <div>・第5回を「型システム理論と言語処理系」に拡張</div>
                <div>・第12回にmTLS・QUIC・Service Meshを追加</div>
                <div>・第7回にアルゴリズム設計パラダイムを追加</div>
              </div>
              <div>
                <div style={{ color: "#DC2626", marginBottom: 6, fontWeight: 600 }}>その他</div>
                <div>・第2.5回「AIアプリ全体像プレビュー」追加（早期モチベ）</div>
                <div>・シリーズ名を変更（看板に偽りなしの表現に）</div>
                <div>・全回でPACELC・ReBAC等の現代用語を追加</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "24px 40px",
          display: "flex",
          gap: 32,
          flex: 1,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <div style={{ marginBottom: 16, display: "flex", gap: 8, flexDirection: "column" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="タイトル・内容で検索..."
              style={{
                background: "#13131e",
                border: "1px solid #1e1e2e",
                color: "#e8e4dc",
                padding: "8px 12px",
                borderRadius: 4,
                fontSize: 13,
                fontFamily: "monospace",
                outline: "none",
                width: "100%",
              }}
            />
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { key: "all", label: "全33本" },
                { key: "core", label: "CORE 10" },
                { key: "new", label: "新規・拡張" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 2,
                    border:
                      filter === item.key ? "1px solid #00D4FF" : "1px solid #1e1e2e",
                    background: filter === item.key ? "#00D4FF15" : "transparent",
                    color: filter === item.key ? "#00D4FF" : "#4a4a6a",
                    fontSize: 10,
                    fontFamily: "monospace",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    flex: 1,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {phases.map((phase) => {
              const phaseEpisodes = filtered.filter((episode) => phase.episodes.includes(episode.id));
              if (phaseEpisodes.length === 0) {
                return null;
              }

              return (
                <div key={phase.id}>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: phase.color,
                      padding: "10px 0 4px",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      borderTop: "1px solid #1e1e2e",
                    }}
                  >
                    {phase.name} - {phase.label}
                  </div>
                  {phaseEpisodes.map((ep) => {
                    const isNew = newEpisodes.includes(ep.id);
                    const isExpanded = expandedEpisodes.includes(ep.id);
                    const isSplit = splitEpisodes.includes(ep.id);

                    return (
                      <div
                        key={ep.id}
                        onClick={() => setSelected(ep.id)}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          background: selected === ep.id ? "#13131e" : "transparent",
                          borderLeft:
                            selected === ep.id
                              ? `2px solid ${phase.color}`
                              : "2px solid transparent",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          transition: "all 0.1s",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            color: isNew ? "#D97706" : "#3a3a5a",
                            fontFamily: "monospace",
                            minWidth: 32,
                          }}
                        >
                          #{formatId(ep.id)}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: selected === ep.id ? "#e8e4dc" : "#8a8aaa",
                            flex: 1,
                          }}
                        >
                          {ep.title}
                        </span>
                        {coreEpisodes.includes(ep.id) && (
                          <span
                            style={{
                              fontSize: 9,
                              color: "#00D4FF",
                              border: "1px solid #00D4FF44",
                              padding: "1px 5px",
                              borderRadius: 2,
                              fontFamily: "monospace",
                              letterSpacing: "0.1em",
                            }}
                          >
                            CORE
                          </span>
                        )}
                        {isNew && (
                          <span
                            style={{
                              fontSize: 9,
                              color: "#D97706",
                              border: "1px solid #D9770644",
                              padding: "1px 5px",
                              borderRadius: 2,
                              fontFamily: "monospace",
                              letterSpacing: "0.1em",
                            }}
                          >
                            NEW
                          </span>
                        )}
                        {isExpanded && (
                          <span
                            style={{
                              fontSize: 9,
                              color: "#7C3AED",
                              border: "1px solid #7C3AED44",
                              padding: "1px 5px",
                              borderRadius: 2,
                              fontFamily: "monospace",
                              letterSpacing: "0.1em",
                            }}
                          >
                            EXP
                          </span>
                        )}
                        {isSplit && (
                          <span
                            style={{
                              fontSize: 9,
                              color: "#059669",
                              border: "1px solid #05966944",
                              padding: "1px 5px",
                              borderRadius: 2,
                              fontFamily: "monospace",
                              letterSpacing: "0.1em",
                            }}
                          >
                            SPLIT
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flex: "1 1 560px", minWidth: 0 }}>
          {selectedEp ? (
            <div>
              <div
                style={{
                  marginBottom: 24,
                  padding: "24px",
                  background: "#13131e",
                  border: `1px solid ${getPhaseColor(selectedEp.id)}33`,
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: getPhaseColor(selectedEp.id),
                        fontFamily: "monospace",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {getPhaseInfo(selectedEp.id)?.name} - {getPhaseInfo(selectedEp.id)?.label}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 13,
                          color: "#3a3a5a",
                          fontFamily: "monospace",
                        }}
                      >
                        第{selectedEp.id}回
                      </span>
                      <h2
                        style={{
                          fontSize: 22,
                          fontWeight: "normal",
                          margin: 0,
                          color: "#e8e4dc",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {selectedEp.title}
                      </h2>
                      {coreEpisodes.includes(selectedEp.id) && (
                        <span
                          style={{
                            fontSize: 9,
                            color: "#00D4FF",
                            border: "1px solid #00D4FF44",
                            padding: "2px 7px",
                            borderRadius: 2,
                            fontFamily: "monospace",
                            letterSpacing: "0.1em",
                          }}
                        >
                          CORE
                        </span>
                      )}
                      {newEpisodes.includes(selectedEp.id) && (
                        <span
                          style={{
                            fontSize: 9,
                            color: "#D97706",
                            border: "1px solid #D9770644",
                            padding: "2px 7px",
                            borderRadius: 2,
                            fontFamily: "monospace",
                            letterSpacing: "0.1em",
                          }}
                        >
                          NEW IN v2
                        </span>
                      )}
                      {expandedEpisodes.includes(selectedEp.id) && (
                        <span
                          style={{
                            fontSize: 9,
                            color: "#7C3AED",
                            border: "1px solid #7C3AED44",
                            padding: "2px 7px",
                            borderRadius: 2,
                            fontFamily: "monospace",
                            letterSpacing: "0.1em",
                          }}
                        >
                          EXPANDED
                        </span>
                      )}
                      {splitEpisodes.includes(selectedEp.id) && (
                        <span
                          style={{
                            fontSize: 9,
                            color: "#059669",
                            border: "1px solid #05966944",
                            padding: "2px 7px",
                            borderRadius: 2,
                            fontFamily: "monospace",
                            letterSpacing: "0.1em",
                          }}
                        >
                          SPLIT v2
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: "#4a4a6a",
                      fontFamily: "monospace",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    NotebookLM カスタム指示プロンプト
                  </span>
                  <button
                    onClick={() => handleCopy(selectedEp.prompt)}
                    style={{
                      background: copied ? "#059669" : "#1e1e2e",
                      border: "none",
                      color: copied ? "#fff" : "#8a8aaa",
                      padding: "6px 14px",
                      borderRadius: 2,
                      fontSize: 11,
                      fontFamily: "monospace",
                      cursor: "pointer",
                      letterSpacing: "0.1em",
                      transition: "all 0.2s",
                    }}
                  >
                    {copied ? "COPIED" : "COPY"}
                  </button>
                </div>
                <div
                  style={{
                    background: "#0d0d18",
                    border: "1px solid #1e1e2e",
                    borderRadius: 4,
                    padding: "20px 24px",
                    fontSize: 13.5,
                    lineHeight: 1.85,
                    color: "#c8c4bc",
                    whiteSpace: "pre-wrap",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {selectedEp.prompt}
                </div>
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "#3a3a5a",
                  fontFamily: "monospace",
                  textAlign: "right",
                }}
              >
                {selectedEp.prompt.length} 文字
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: "1px solid #1e1e2e",
                  gap: 12,
                }}
              >
                <button
                  onClick={() => {
                    if (selectedIndex > 0) {
                      setSelected(episodes[selectedIndex - 1].id);
                    }
                  }}
                  disabled={selectedIndex <= 0}
                  style={{
                    background: "transparent",
                    border: "1px solid #1e1e2e",
                    color: selectedIndex <= 0 ? "#2a2a3a" : "#6a6a8a",
                    padding: "8px 16px",
                    borderRadius: 2,
                    fontSize: 12,
                    fontFamily: "monospace",
                    cursor: selectedIndex <= 0 ? "default" : "pointer",
                    letterSpacing: "0.1em",
                  }}
                >
                  ← 前の回
                </button>
                <button
                  onClick={() => {
                    if (selectedIndex < episodes.length - 1) {
                      setSelected(episodes[selectedIndex + 1].id);
                    }
                  }}
                  disabled={selectedIndex === -1 || selectedIndex >= episodes.length - 1}
                  style={{
                    background: "transparent",
                    border: "1px solid #1e1e2e",
                    color:
                      selectedIndex === -1 || selectedIndex >= episodes.length - 1
                        ? "#2a2a3a"
                        : "#6a6a8a",
                    padding: "8px 16px",
                    borderRadius: 2,
                    fontSize: 12,
                    fontFamily: "monospace",
                    cursor:
                      selectedIndex === -1 || selectedIndex >= episodes.length - 1
                        ? "default"
                        : "pointer",
                    letterSpacing: "0.1em",
                  }}
                >
                  次の回 →
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#2a2a4a",
                gap: 16,
                paddingTop: 80,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, opacity: 0.3 }}>◈</div>
              <div style={{ fontSize: 14, fontFamily: "monospace", letterSpacing: "0.1em" }}>
                左のリストから回を選択してください
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#1e1e3a",
                  fontFamily: "monospace",
                  maxWidth: 460,
                  lineHeight: 1.8,
                }}
              >
                右上「CHANGELOG」ボタンで第2版の変更点を確認できます
                <br />
                各プロンプトはNotebookLMの
                <br />
                「音声概要のカスタム指示」欄にそのままペーストできます
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #1e1e2e",
          padding: "12px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 11, color: "#2a2a4a", fontFamily: "monospace" }}>
          v2 - CS非専攻からシニアエンジニアへ
        </div>
        <div style={{ fontSize: 11, color: "#2a2a4a", fontFamily: "monospace" }}>
          Netflix風 × GitHub風 × RAG検索アプリ
        </div>
      </div>
    </div>
  );
}
