class Score < ActiveRecord::Base
  belongs_to :photo
  has_many :tags
  has_many :characters
end
