package codesquad.issueTracker.dto.issue.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IssueIdsRequest {
    List<Long> issueId = new ArrayList<>();
}
