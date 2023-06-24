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
