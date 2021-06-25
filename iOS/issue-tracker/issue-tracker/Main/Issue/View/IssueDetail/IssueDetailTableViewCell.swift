//
//  IssueDetailTableViewCell.swift
//  issue-tracker
//
//  Created by jinseo park on 6/24/21.
//

import UIKit
import Down

class IssueDetailTableViewCell: UITableViewCell {
    
    private let imageLoadManager = ImageLoadManager()
    
    private lazy var userImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.layer.masksToBounds = true
        imageView.layer.cornerRadius = self.frame.size.height / 2
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    private lazy var nameLabel: UILabel = {
        let label = UILabel()
        label.textColor = UIColor.black
        label.font = UIFont.boldSystemFont(ofSize: 17)
        label.text = "유저"
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private lazy var createdDateLabel: UILabel = {
        let label = UILabel()
        label.textColor = UIColor.systemGray2
        label.font = UIFont.boldSystemFont(ofSize: 15)
        label.text = "방금 전"
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private lazy var descriptionMarkDownView: DownView = {
        let downView = try! DownView(frame: .zero, markdownString: "")
        downView.translatesAutoresizingMaskIntoConstraints = false
        downView.pageZoom = 1.5
        return downView
    }()
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setViews()
    }
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setViews()
    }
    
    private func setViews() {
        addUserImageView()
        addUserNameLabel()
        addCreatedDatedLabel()
        addDescriptionMarkDownView()
    }
    
    private func addUserImageView() {
        addSubview(userImageView)
        
        NSLayoutConstraint.activate([
            userImageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            userImageView.topAnchor.constraint(equalTo: topAnchor, constant: 16),
            userImageView.widthAnchor.constraint(equalToConstant: 44),
            userImageView.heightAnchor.constraint(equalToConstant: 44)
        ])
        
        userImageView.contentMode = .scaleAspectFill
        userImageView.image = UIImage(systemName: "square.and.arrow.up")
    }
    
    private func addUserNameLabel() {
        addSubview(nameLabel)
        
        NSLayoutConstraint.activate([
            nameLabel.leadingAnchor.constraint(equalTo: userImageView.trailingAnchor, constant: 8),
            nameLabel.topAnchor.constraint(equalTo: topAnchor, constant: 16)
        ])
    }
    
    private func addCreatedDatedLabel() {
        addSubview(createdDateLabel)
        
        NSLayoutConstraint.activate([
            createdDateLabel.leadingAnchor.constraint(equalTo: userImageView.trailingAnchor, constant: 8),
            createdDateLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 2)
        ])
    }
    
    private func addDescriptionMarkDownView() {
        addSubview(descriptionMarkDownView)
        
        NSLayoutConstraint.activate([
            descriptionMarkDownView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 68),
            descriptionMarkDownView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            descriptionMarkDownView.topAnchor.constraint(equalTo: createdDateLabel.bottomAnchor, constant: 8),
            descriptionMarkDownView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -16)
        ])
    }
    
    func configure(name: String, description: String, imageUrl: String, createdDate: String) {
        nameLabel.text = name
        updateUserImage(imageUrl: imageUrl)
        createdDateLabel.text = calculateDateTime(createdDate: createdDate)
        try? descriptionMarkDownView.update(markdownString: description)
//        print("웹뷰 사이즈 =",descriptionMarkDownView.scrollView.contentSize.height)
    }
 
    private func updateUserImage(imageUrl: String) {
        imageLoadManager.load(from: imageUrl) { cachePath in
            guard let userImage = UIImage(contentsOfFile: cachePath) else {return}
            DispatchQueue.main.async {
                self.userImageView.image = userImage
            }
        }
    }
    
    private func calculateDateTime(createdDate: String) -> String {
                
        let dateFormatter = DateFormatter()
        dateFormatter.timeZone = TimeZone(abbreviation: "UTC")
        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm"
        guard let startDate = dateFormatter.date(from: createdDate) else { return "방금"}
        let interval = Date() - startDate
        
        if interval.month! != 0 {
            return "\(interval.month!)달"
        } else if interval.day! != 0 {
            return "\(interval.day!)일"
        } else if interval.hour! != 0 {
            return "\(interval.hour!)시간"
        } else if interval.minute! != 0 {
            return "\(interval.minute!)분"
        } else {
            return "\(interval.second!)초"
        }
    }
    
}
