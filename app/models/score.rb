class Score < ActiveRecord::Base
  belongs_to :photo
  has_many :tags
end
