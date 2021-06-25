//
//  IssueDetail.swift
//  issue-tracker
//
//  Created by jinseo park on 6/24/21.
//

import Foundation


struct IssueDetailDTO: Decodable {
    let data: IssueDetail?
    let error: String?
    
    enum CodingKeys: String, CodingKey {
        case data
        case error
    }
}

struct Comment: Decodable {
    private(set) var id: Int
    private(set) var description: String?
    private(set) var author: Author
    private(set) var createdDate: String
    
    enum CodingKeys: String, CodingKey {
        case id
        case description
        case author
        case createdDate = "created_date"
    }
}

struct IssueDetail: Decodable {
    private(set) var issueNumber: Int
    private(set) var title: String
    private(set) var status: Bool
    private(set) var author: Author
    private(set) var assignees: [Assignee]?
//    private(set) var labels: [Label]?
//    private(set) var milestone: MileStone?
    private(set) var comments: [Comment]?
    private(set) var createdDate: String
    
    enum CodingKeys: String, CodingKey {
        case issueNumber
        case title
        case status
        case author
        case assignees
//        case labels
//        case milestone
        case comments = "comment"
        case createdDate = "created_date"
    }
}
