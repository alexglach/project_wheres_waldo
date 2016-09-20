class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :score
      t.string :username
      t.timestamps null: false
    end
  end
end
