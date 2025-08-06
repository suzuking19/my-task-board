Supabase Task Board (Local Operation Version)
⚠️ Note: This document contains content in both Japanese and English. The sections for each language are independent, and their content may not always be perfectly synchronized.

Supabase 連携タスクボード（ローカル運用版）
⚠️ 注意: このドキュメントには日本語と英語の両方の内容が含まれています。各言語のセクションは独立しており、内容が常に完全に同期しているとは限りません。

# Supabase Task Board (Local Operation Version)

This task board is a local operation project specialized in managing PC tasks. It enables smooth task management through direct communication with Supabase. Feel free to customize and use it under the MIT License.

---

## Important Notes

This project does not perform authentication and communicates directly with Supabase by setting up a local server, thus **RLS (Row Level Security) is not implemented**.
Furthermore, my development policy dictates that when publishing source code for projects without RLS, I do not use the Supabase client on the client side. This is why `utils/supabase/client.ts` has not been created in this project.

### Recommendations for Public Exposure

If you plan to develop a product based on this project that will be publicly exposed, **we strongly recommend adding authentication features and implementing RLS.** You can enhance security by creating `middleware.ts` and configuring RLS. Please refer to the official Supabase documentation for details:

[Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)

### Port Number Configuration

You can freely set the port number in the `package.json` file. Please change it as needed to avoid conflicts with other local servers.

---

### 📝 Setup Instructions

1.  **Clone the repository**

    ```bash
    git clone https://github.com/suzuking19/my-task-board.git
    cd my-task-board
    ```

2.  **Create a Supabase Project**

    Access the Supabase dashboard and create a new project.

3.  **Create Tables (Supabase Dashboard)**

    From the Supabase dashboard, create a table with the following DB structure:

    **DB Structure**

    | Column Name    | Type          |
    | :------------- | :------------ |
    | `id`           | `int8`        |
    | `created_at`   | `timestamptz` |
    | `title`        | `text`        |
    | `is_completed` | `boolean`     |

    **Subtasks Table Structure**

    | Column Name      | Type          |
    | :--------------- | :------------ |
    | `id`             | `int8`        |
    | `parent_task_id` | `int8`        |
    | `title`          | `text`        |
    | `is_completed`   | `boolean`     |
    | `created_at`     | `timestamptz` |

    > Note: `parent_task_id` is a foreign key that references the `id` of the `tasks` table.

4.  **.env File Setup**

    Rename the `.env.txt` file to `.env`.

5.  **Paste Supabase Connection Information**

    Obtain your **Project URL** and **Anon Key** from the Supabase dashboard and paste them into the `.env` file.

    ```dotenv
    SUPABASE_URL=<your_supabase_project_url>
    SUPABASE_ANON_KEY=<your_supabase_anon_key>
    ```

6.  **Start the Local Server**

    ```bash
    npm install
    npm run dev
    ```

    This will start the local server, and you will be able to access the task board.

# Supabase 連携タスクボード（ローカル運用版）

このタスクボードは、PC 作業のタスク管理に特化したローカル運用プロジェクトです。Supabase との直接通信により、スムーズなタスク管理を実現します。MIT ライセンスのもと、自由にカスタマイズしてご活用ください。

## 注意事項

本プロジェクトは認証は行わず、ローカルサーバーを立てて直接 Supabase と通信するため、RLS（Row Level Security）を設けていません。\
また、本プロジェクトで utils/supabase/client.ts を作成していないのは、RLS を設定しないプロジェクトでソースコードを公開する際にはクライアントサイドで Supabase クライアントを使用しないという私の開発指針に基づいています。

### 外部公開に関する推奨事項

もしこのプロジェクトをベースに外部公開を伴うプロダクトを開発される場合は、**認証機能の追加と RLS の導入を強く推奨します。** `middleware.ts`の作成や RLS の設定を行うことで、セキュリティを強化できます。詳細は以下の Supabase 公式ドキュメントをご参照ください。

[Setting up Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)

### ポート番号の設定

`package.json`ファイルからポート番号を自由に設定できます。他のローカルサーバーと競合しないように適宜変更してください。

### 📝 導入手順

1.  **リポジトリをクローン**

    ```bash
    git clone https://github.com/suzuking19/my-task-board.git
    cd my-task-board
    ```

2.  **Supabase プロジェクトの作成**

    Supabase のダッシュボードにアクセスし、新しいプロジェクトを作成します。

3.  **テーブルの作成（Supabase ダッシュボード）**

    Supabase のダッシュボードから以下の DB 構造でテーブルを作成してください。

    **DB 構造**

    | カラム名       | 型            |
    | :------------- | :------------ |
    | `id`           | `int8`        |
    | `created_at`   | `timestamptz` |
    | `title`        | `text`        |
    | `is_completed` | `boolean`     |

    **サブタスクテーブル構造**

    | カラム名         | 型            |
    | :--------------- | :------------ |
    | `id`             | `int8`        |
    | `parent_task_id` | `int8`        |
    | `title`          | `text`        |
    | `is_completed`   | `boolean`     |
    | `created_at`     | `timestamptz` |

    > 注意: `parent_task_id`は`tasks`テーブルの`id`を参照する外部キーです。

4.  **.env ファイルの設定**

    `.env.txt`ファイルを`.env`にリネームします。

5.  **Supabase 接続情報の貼り付け**

    Supabase ダッシュボードから**プロジェクト URL**と**Anon Key**を取得し、`.env`ファイルに貼り付けます。

    ```dotenv
    SUPABASE_URL=<your_supabase_project_url>
    SUPABASE_ANON_KEY=<your_supabase_anon_key>
    ```

6.  **ローカルサーバーの起動**

    ```bash
    npm install
    npm run dev
    ```

    これでローカルサーバーが起動し、タスクボードにアクセスできるようになります。

---
