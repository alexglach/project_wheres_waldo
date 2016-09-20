class AddGameIdToScores < ActiveRecord::Migration
  def change
    add_reference :scores, :photo, foreign_key: true
  end
end
