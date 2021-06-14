package codesquad.issueTracker.controller;

import codesquad.issueTracker.Data;
import codesquad.issueTracker.domain.Label;
import codesquad.issueTracker.service.LabelService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/labels")
public class LabelController {
    private final LabelService labelService;

    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping
    public ResponseEntity<Data> getLabels() {
        return ResponseEntity.ok(labelService.findAll());
    }

    @PostMapping
    public ResponseEntity<String> creatLabel(@RequestBody Label label) {
        labelService.creatLabel(label);
        return ResponseEntity.ok().body("데이터 저장 성공!");
    }

    @PutMapping("/{labelId}")
    public ResponseEntity<String> updateLabel(@PathVariable Long labelId, @RequestBody Label label) {
        labelService.updateLabel(labelId, label);
        return ResponseEntity.ok().body("데이터 편집 완료!");
    }

    @DeleteMapping("/{labelId}")
    public ResponseEntity<String> deleteLabel(@PathVariable Long labelId) {
        labelService.deleteLabel(labelId);
        return ResponseEntity.ok().body("데이터 삭제 완료!");
    }
}
