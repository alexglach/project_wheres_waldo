class Photo < ActiveRecord::Base
  has_many :tags
  has_many :scores
end
