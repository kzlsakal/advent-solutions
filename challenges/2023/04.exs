Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def first_result(input) do
    input
    |> parse_cards()
    |> Enum.reduce(0, fn {[winning, own], _idx}, acc ->
      won = get_num_of_won_numbers(winning, own)
      2 |> :math.pow(won - 1) |> trunc() |> Kernel.+(acc)
    end)
  end

  def second_result(input) do
    cards = parse_cards(input)
    number_of_cards = length(cards)
    copies = Enum.reduce(cards, %{}, fn {_card, idx}, acc -> Map.put(acc, idx, 1) end)

    cards
    |> Enum.reduce(copies, fn {[winning, own], idx}, current_copies ->
      case get_num_of_won_numbers(winning, own) do
        won when won >= 1 ->
          num_of_copies = Map.get(current_copies, idx)

          Enum.reduce(1..won, current_copies, fn idx_diff, acc ->
            case idx + idx_diff do
              copy_idx when copy_idx < number_of_cards ->
                Map.put(acc, copy_idx, Map.get(acc, copy_idx) + num_of_copies)

              _ ->
                acc
            end
          end)

        _ ->
          current_copies
      end
    end)
    |> Enum.reduce(0, &(elem(&1, 1) + &2))
  end

  defp get_num_of_won_numbers(winning_nums, own_nums) do
    Enum.reduce(own_nums, 0, fn num, acc ->
      if num in winning_nums, do: acc + 1, else: acc
    end)
  end

  defp parse_cards(input) do
    input
    |> Enum.with_index()
    |> Enum.map(fn {card, card_idx} ->
      card
      |> String.split(": ")
      |> List.last()
      |> String.split(" | ")
      |> Enum.map(&String.split(&1, " ", trim: true))
      |> then(&{&1, card_idx})
    end)
  end
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
Utils.run(&Challenge.second_result/1, __ENV__.file, "Q2")
