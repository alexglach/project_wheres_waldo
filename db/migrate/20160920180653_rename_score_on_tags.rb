class RenameScoreOnTags < ActiveRecord::Migration
  def change
    rename_column :tags, :photo_id, :score_id
  end
end
