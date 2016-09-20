class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :character_name
      t.float :x_location
      t.float :y_location
      t.references :photo
      t.timestamps null: false
    end
  end
end
