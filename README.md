# 運命の人占いアプリ「恋愛適性診断」
## 概要
このアプリケーションは、ユーザーの誕生日を入力することで、その人の運命の人の特徴をAIが占い、結果を表示するものです。OpenAIのGPT-3.5turboを利用して、運命の人の特徴を生成します。アニメ「PSYCHO-PASS」に登場する「シビュラシステム」の機能の一部である「恋愛適正」にインスパイアを受けて開発しました。

## 機能
- ユーザーの誕生日の入力
- 運命の人の特徴の生成と表示
- デジタルノイズとモーションを用いたタイトルの表示

## 使用技術
- Ruby on Rails
- OpenAI gpt-3.5-turbo-16k-0613
- HTML/CSS/JavaScript

## セットアップ
1. リポジトリをクローンします。
```
git clone <リポジトリのURL>
```
2. 必要なGemをインストールします。
```
bundle install
```
3.データベースをセットアップします。
```
rails db:create
rails db:migrate
```
4. OpenAIのAPIキーを環境変数に設定します。
```
export OPENAI_API_KEY=your_api_key
```
5. サーバーを起動します。
```
rails s
```

## GPTにどのようなプロンプトを与えているのか
- 役割を明確にする (例：あなたはプロの占い師です)
- 用いる概念を明確にする (例：算命学を用いて~~)
- 出力方法を明確にする (例：項目ごとに分けて教えてください。)
```ruby
# app/models/user.rb
require 'openai'

class User < ApplicationRecord
  after_create :generate_partner_proposal

  private

  def generate_partner_proposal
    client = OpenAI::Client.new
    response = client.chat(
      parameters: {
        model: "gpt-3.5-turbo-16k",
        messages: [
          { role: 'system', content: "あなたはプロの占い師で、算命学を用いてユーザーの運命の人を占います。 #{self.birthday}, この誕生日にピッタリの素敵な異性の特徴を項目ごとに分けて教えてください。" }
        ]
      }
    )
  
    puts "OpenAI API Response: #{response.inspect}" # レスポンスをログに出力
  
    if response['choices'].present?
      self.partner_proposal = response['choices'].first['message']['content'].strip
      self.save
    else
      puts "No choices in the response from OpenAI API"
    end
  end
end
```
