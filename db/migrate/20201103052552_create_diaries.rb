class CreateDiaries < ActiveRecord::Migration[6.0]
  def change
    create_table :diaries do |t|
      t.text :episode
      t.text :tomorrow
      t.text :memo
      t.references  :user, null: false, foreign_key: true
      t.string :day, unique: true ,null: false

      t.timestamps
    end
  end
end
