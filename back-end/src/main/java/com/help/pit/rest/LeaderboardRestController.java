package com.help.pit.rest;

import com.help.pit.entity.*;
import com.help.pit.models.BaseResponse;
import com.help.pit.models.SuccessResponse;
import com.help.pit.service.LeaderboardService;
import com.help.pit.service.UserService;
import com.help.pit.utils.SngConstants;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = SngConstants.origins)
@RestController
@RequestMapping("/api/")
@AllArgsConstructor
public class LeaderboardRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping("/leaderboards")
    public BaseResponse<List<LeaderboardDTO>> getAll() {
        return new SuccessResponse<>(leaderboardService.getAll());
    }

    @PostMapping("/leaderboards")
    public BaseResponse<Map<String, Integer>> leaderboard(@Valid @RequestBody LeaderboardPostRequestDTO leaderboardPostRequestDTO) throws BadRequestException {
        User user = userService.findById(leaderboardPostRequestDTO.getId());

        // Base score is 50
        Integer score = SngConstants.baseScore + getAdditionalScore(leaderboardPostRequestDTO.getStars());

        Leaderboard leaderboard = leaderboardService.findByUser(user);

        if (leaderboard == null) {
            leaderboard = new Leaderboard();
            leaderboard.setUser(user);
            leaderboard.setScore(score);
            leaderboardService.save(leaderboard);
        } else {
            Integer oldScore = leaderboard.getScore();
            score += oldScore;
            Integer result = leaderboardService.updateScore(score, leaderboard.getId());
            if (result == 0) {
                throw new BadRequestException("Leaderboard not found");
            }
        }

        Map<String, Integer> mp = new HashMap<>();
        mp.put("score", score);

        return new SuccessResponse<>(mp, "Thanks for giving the ratings!");
    }

    private Integer getAdditionalScore(Integer ratings) {
        return switch (ratings) {
            case 1 -> -40;
            case 2 -> -10;
            case 3 -> 5;
            case 4 -> 15;
            case 5 -> 20;
            default -> 0;
        };
    }

    private User getUser(String authToken) {
        Integer id = leaderboardService.extractUserId(authToken);
        return userService.findById(id);
    }
}
