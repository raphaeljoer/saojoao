import assert from "assert";
import { describe, test } from "vitest";
import { GetResultUsecase } from "../../../src/core/server/application/usecases/get-result/get-result.usecase";
import { artistProps } from '../../../src/core/shared/data/artists';
import { FakeVoteRepository } from "../../fakes/fake-vote-repository";

describe("GetResultUseCase", () => {
  test("Should get the results", async () => {
    const voteRepository = new FakeVoteRepository();
    
    voteRepository.addVote({
      artistId: artistProps[0].artistId,
      votedAt: new Date().toISOString(),
      ip: "fake-ip",
    });
    
    voteRepository.addVote({
      artistId: artistProps[0].artistId,
      votedAt: new Date().toISOString(),
      ip: "fake-ip",
    });
    
    voteRepository.addVote({
      artistId: artistProps[1].artistId,
      votedAt: new Date().toISOString(),
      ip: "fake-ip",
    });
    
    voteRepository.addVote({
      artistId: artistProps[2].artistId,
      votedAt: new Date().toISOString(),
      ip: "fake-ip",
    });
    
    const getResultUseCase = new GetResultUsecase({ voteRepository });
    const result = await getResultUseCase.execute();

    assert.strictEqual(result.isSuccess(), true);
    assert.strictEqual(result.isFailure(), false);

    if(result.isSuccess()) {
      assert.strictEqual(result.value.length, 3);
      assert.strictEqual(result.value[0].artistId, artistProps[0].artistId);
      assert.strictEqual(result.value[0].name, artistProps[0].name);
      assert.strictEqual(result.value[0].position, 1);
    }
  });
});