class Photo < ActiveRecord::Base
  has_many :tags
end
